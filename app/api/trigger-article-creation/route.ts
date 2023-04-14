import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../supabaseAdmin";

export async function POST(request: Request) {
  const { data, error } = await supabaseAdmin
    .from("topics")
    .select("content, user_id");

  if (!data)
    return NextResponse.json(
      { status: "error", detail: error.message },
      { status: 400 }
    );

  await fetch(`${process.env.RENDER_FUNCTION_URL!}/create-article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json({ status: "done" });
}
