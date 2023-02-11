import Head from "next/head";

import { Container, Row } from "@nextui-org/react";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import { useEffect } from "react";
import { useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import ThreeStories from "../components/ThreeStories";
import VectorStories from "../components/VectorStories";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
const Home = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.replace(process.env.NEXT_PUBLIC_APP_URL + "/dashboard");
  });
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[1280px] mx-auto">
        <Hero />
        <VectorStories />
        <ThreeStories />
        <Faq />
      </main>
    </Container>
  );
};
export default Home;
