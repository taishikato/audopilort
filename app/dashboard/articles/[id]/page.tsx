"use client";

import { useEffect, useState } from "react";
import { Database } from "../../../../types/supabase";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import "../../../../styles/globals.scss";
import { Tabs } from "./components/Tabs";
import { Preview } from "./components/Preview";
import { Draft } from "./components/Draft";
import { ErrorAlert } from "./components/ErrorAlert";

export default function Article() {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const params = useParams();
  const id = params.id;
  const [content, setContent] = useState<string | null>(null);
  const [visibleScreen, setVisibleScreen] = useState<"draft" | "preview">(
    "draft"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setError(null);

      const { data, error } = await supabase
        .from("articles")
        .select("content")
        .eq("id", id)
        .single();

      if (error) console.log(error);

      if (!data || !data.content || error) {
        setError(error?.message ?? "An error occurred.");
        return;
      }

      setContent(data.content);
    };

    fetchArticle();
  }, [supabase, id]);

  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pl-96">
          <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {error ? (
              <ErrorAlert errorMessage={error} />
            ) : (
              <>
                <Tabs
                  visibleScreen={visibleScreen}
                  setVisibleScreen={setVisibleScreen}
                />
                {visibleScreen === "draft" && <Draft content={content ?? ""} />}
                {visibleScreen === "preview" && (
                  <Preview content={content ?? ""} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
