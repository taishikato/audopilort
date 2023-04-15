"use client";

import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ArticlesLayout = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const params = useParams();
  const id = params.id;
  const [articles, setArticles] = useState<
    Pick<
      Database["public"]["Tables"]["articles"]["Row"],
      "content" | "id" | "created_at"
    >[]
  >([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("articles")
        .select("id, created_at, content")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!data) {
        setArticles([]);
        return;
      }

      setArticles(data);
    };

    fetchArticles();
  }, [supabase]);

  return (
    <>
      {children}
      <aside className="fixed inset-y-0 hidden px-3 py-6 overflow-y-auto bg-white border-r border-gray-200 left-72 w-96 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
        <h3 className="px-3 mb-2 font-semibold leading-6 rounded-md">
          Articles
        </h3>

        {articles.length > 0 ? (
          <ul className="space-y-1">
            {articles.map((a) => {
              return (
                <li key={a.id}>
                  <Link
                    href={`/dashboard/articles/${a.id}`}
                    className={classNames(
                      id === a.id
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <DocumentIcon
                      className={classNames(
                        id === "123"
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="line-clamp-1">{a.content}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-3">
            No article yet. All you can do is just wait!
          </div>
        )}
      </aside>
    </>
  );
};

export default ArticlesLayout;
