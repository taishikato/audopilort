"use client";

import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ArticlesLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();

  return (
    <>
      {children}
      <aside className="fixed inset-y-0 hidden px-3 py-6 overflow-y-auto bg-white border-r border-gray-200 left-72 w-96 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
        <h3 className="px-3 mb-2 font-semibold leading-6 rounded-md">
          Articles
        </h3>

        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/articles/123"
              className={classNames(
                id === "123"
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
              How to get the latest AI
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/articles/456"
              className={classNames(
                id === "456"
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              )}
            >
              <DocumentIcon
                className={classNames(
                  id === "456"
                    ? "text-indigo-600"
                    : "text-gray-400 group-hover:text-indigo-600",
                  "h-6 w-6 shrink-0"
                )}
                aria-hidden="true"
              />
              How to use LangChain
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default ArticlesLayout;
