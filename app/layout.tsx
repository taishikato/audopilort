"use client";

import { useRouter } from "next/navigation";
import "./global.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function RootLayout(props: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string) => {
      router.refresh();

      if (event === "SIGNED_OUT") router.push("/");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <html lang="en" className="antialiased scroll-smooth">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen bg-slate-50">
        <Toaster richColors position="top-center" duration={5000} />
        {props.children}
      </body>
    </html>
  );
}
