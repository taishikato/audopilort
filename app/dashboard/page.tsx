"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useEffect, useState } from "react";

export default function Dashboard() {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [userId, setUserId] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndTopicAndApiKey = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) return;

      const { id: userId } = user;

      setUserId(userId);

      const [topicResponse, apiKeyResponse] = await Promise.all([
        supabase.from("topics").select("content").eq("user_id", userId),
        supabase.from("api_keys").select("api_key").eq("user_id", userId),
      ]);

      if (
        !topicResponse.error &&
        topicResponse.data &&
        topicResponse.data.length > 0
      ) {
        setTopic(topicResponse.data[0].content);
      } else {
        console.error(topicResponse.error);
      }

      if (
        !apiKeyResponse.error &&
        apiKeyResponse.data &&
        apiKeyResponse.data.length > 0
      ) {
        setApiKey(apiKeyResponse.data[0].api_key);
      } else {
        console.error(apiKeyResponse.error);
      }
    };

    fetchUserAndTopicAndApiKey();
  }, [supabase]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: topicCount, count } = await supabase
      .from("topics")
      .select("*", { count: "exact" })
      .eq("user_id", userId);

    if (count === null) return;

    if (count > 0) {
      const { data: topicCount, count } = await supabase
        .from("topics")
        .update({ content: topic, user_id: userId })
        .eq("user_id", userId);
    } else {
      const { data: topicCount, count } = await supabase
        .from("topics")
        .insert({ content: topic, user_id: userId });
    }
  };

  return (
    <main className="lg:pl-72">
      <div className="">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          {/* Main area */}

          <div className="bg-white rounded-md shadow">
            <div className="px-4 py-6 max-w-7xl sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
            </div>

            <div className="px-4 py-6 max-w-7xl sm:px-6 lg:px-8">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-800">
                Settings
              </h2>
              <label
                htmlFor="topic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Topics for autopilot to write about
              </label>
              <form
                className="flex items-center mt-2 mb-5 space-x-2"
                onSubmit={(e) => onSubmit(e)}
              >
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  className="min-w-[300px] p-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Latest AI news"
                  value={topic ?? ""}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-base font-semibold text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                  Save
                </button>
              </form>

              <label
                htmlFor="topic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                API to fetch your articles
              </label>
              <form
                className="flex items-center mt-2 space-x-2"
                onSubmit={(e) => onSubmit(e)}
              >
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  className="min-w-[500px] p-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Latest AI news"
                  value={`${process.env.NEXT_PUBLIC_GET_ARTICLES_API}?api_key=${apiKey}`}
                  disabled
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
