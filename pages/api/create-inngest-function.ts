/**
 * This endpoint shouldn't be called by a user.
 * This is to create an inngest function easily for a developer
 * @link https://vercel.com/integrations/inngest
 */
import { Inngest } from "inngest";
import { serve } from "inngest/next";
import { supabaseAdmin } from "../../supabaseAdmin";

const inngest = new Inngest({ name: "Autopilot" });
const fn = inngest.createFunction(
  { name: "Article creation" },
  { cron: "TZ=America/Los_Angeles 25 16 * * *" },
  async ({ step }) => {
    const { data, error } = await supabaseAdmin
      .from("topics")
      .select("content, user_id");

    console.log({ data });

    if (!data) return;

    fetch(`${process.env.RENDER_FUNCTION_URL!}/create-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
);

export default serve(inngest, [fn]);
