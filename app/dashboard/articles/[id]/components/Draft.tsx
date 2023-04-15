import type { Database } from "../../../../../types/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export const Draft = ({ content }: { content: string }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const params = useParams();
  const id = params!.id;
  const [contentForEdit, setContentForEdit] = useState(content);

  useEffect(() => {
    setContentForEdit(content);
  }, [content]);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <form
        className="h-full"
        onSubmit={async (e) => {
          e.preventDefault();

          await supabase
            .from("articles")
            .update({ content: contentForEdit })
            .eq("id", id);
          toast.success("Successfully saved.");
        }}
      >
        <textarea
          className="w-full h-full p-3 mb-1 overflow-auto rounded-md"
          value={contentForEdit}
          onChange={(e) => setContentForEdit(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Button text
          </button>
        </div>
      </form>
    </div>
  );
};
