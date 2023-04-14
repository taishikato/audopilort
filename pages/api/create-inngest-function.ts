/**
 * This endpoint shouldn't be called by a user.
 * This is to create an inngest function easily for a developer
 * @link https://vercel.com/integrations/inngest
 */
import { Inngest } from "inngest";
import { serve } from "inngest/next";
import { supabaseAdmin } from "../../supabaseAdmin";

const createPayload = (topic: string) => ({
  messages: [
    {
      role: "user",
      content: `Please create a simple blog post about the ${topic}`,
    },
  ],
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

const inngest = new Inngest({ name: "Autopilot" });
const fn = inngest.createFunction(
  { name: "Article creation" },
  { cron: "TZ=America/Los_Angeles 42 14 * * *" },
  async ({ event }) => {
    // Collect topics
    const { data: topicsData, error: topicsError } = await supabaseAdmin
      .from("topics")
      .select("content, user_id");

    if (topicsError || !topicsData || topicsData.length === 0) return;

    const articleContentAndUserId: { content: string; userId: string }[] = [];

    for (const topic of topicsData) {
      if (!topic.content) continue;

      // generate article
      const json = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify(createPayload(topic.content)),
      }).then((res) => res.json());

      articleContentAndUserId.push({
        content:
          json.choices[0].message.content ?? "Sorry...an error occurred.",
        userId: topic.user_id,
      });
    }

    const chunkSize = 50; // The size of each chunk
    const chunkedArr = [];

    for (let i = 0; i < articleContentAndUserId.length; i += chunkSize) {
      const chunk = articleContentAndUserId.slice(i, i + chunkSize);
      chunkedArr.push(chunk);
    }

    // save them on database
    for (const chunk of chunkedArr) {
      await Promise.all([
        chunk.map((data) => {
          supabaseAdmin.from("articles").insert({
            content: data.content,
            user_id: data.userId,
          });
        }),
      ]);
    }
  }
);

export default serve(inngest, [fn]);
