"use client";

import { useEffect, useState } from "react";
import { Database } from "../../../../types/supabase";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "../../../../styles/globals.scss";

export default function Article() {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const params = useParams();
  const id = params.id;
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("content")
        .eq("id", id)
        .single();

      if (!data || !data.content) return;

      setContent(data.content);
    };

    fetchArticle();
  }, [supabase, id]);

  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6" id="md-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content ?? ""}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  );
}
