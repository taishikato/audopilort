"use client";

import Head from "next/head";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import {
  createBrowserSupabaseClient,
  createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// do not cache this page
export const revalidate = 0;

export const runtime = "experimental-edge";

export default function Home() {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user === null) {
        return;
      }

      // try to fetch user data to see if they already have an account or not.
      const { count } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("id", user.id);

      if ((count as number) === 0) {
        // register on DB
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
        });
      }

      router.push("/dashboard");
    };

    fetchUser();
  }, [supabase, router]);

  return (
    <>
      <Head>
        <title>TaxPal - Accounting made simple for small businesses</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        {/* <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}
