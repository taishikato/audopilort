/**
 * This endpoint shouldn't be called by a user.
 * This is to create an inngest function easily for a developer
 * @link https://vercel.com/integrations/inngest
 */
import { Inngest } from "inngest";
import { serve } from "inngest/next";

const inngest = new Inngest({ name: "Autopilot" });
const fn = inngest.createFunction(
  { name: "Article creation" },
  { cron: "TZ=America/Los_Angeles 0 14 * * *" },
  async ({ event }) => {
    console.log("yo");
  }
);

export default serve(inngest, [fn]);
