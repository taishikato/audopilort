import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Hello from Functions!");

serve(async (req: Request) => {
  const supabaseClientAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_KEY") ?? ""
  );

  const url = new URL(req.url);
  const apiKey = url.searchParams.get("api_key");

  if (!apiKey) return new Response("Validation error", { status: 400 });

  const { data: apiKeyData, error: apiKeyError } = await supabaseClientAdmin
    .from("api_keys")
    .select("api_key, user_id")
    .eq("api_key", apiKey);

  if (apiKeyError || apiKeyData.length === 0)
    return new Response(`Invalid request. ${apiKeyError?.message ?? ""}`, {
      status: 400,
    });

  const { data, error } = await supabaseClientAdmin
    .from("articles")
    .select("*")
    .eq("user_id", apiKeyData[0].user_id)
    .order("created_at", { ascending: false });

  if (error)
    return new Response(
      JSON.stringify({ result: "error", detail: error.message }),
      { headers: { "Content-Type": "application/json" } }
    );

  return new Response(JSON.stringify(data ?? []), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
