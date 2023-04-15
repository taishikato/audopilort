"use client";

import Head from "next/head";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CallToAction } from "./components/CallToAction";

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

        const apiKey = uuidv4();
        await supabase.from("api_keys").insert({
          user_id: user.id,
          api_key: apiKey,
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
        <CallToAction />
        {/* <PrimaryFeatures />
        <SecondaryFeatures />
        <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}
