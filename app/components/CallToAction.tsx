import Image from "next/image";

import { Button } from "./Button";
import { Container } from "./Container";
import backgroundImage from "../../images/background-call-to-action.jpg";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const CallToAction = () => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <section
      id="get-started-today"
      className="relative py-32 overflow-hidden bg-blue-600"
    >
      <Image
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-w-none"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl tracking-tight text-white font-display sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It&apos;s time to take advantage of AI and grow your blog.
          </p>
          <Button color="white" className="mt-10" onClick={signInWithGoogle}>
            Get started today
          </Button>
        </div>
      </Container>
    </section>
  );
};
