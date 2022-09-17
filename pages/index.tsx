import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row } from "@nextui-org/react";
import Hero from "../components/Hero";
import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Avatar,
  Dropdown,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Footer from "../components/layout/Footer";
import NavbarComponent from "../components/layout/NavbarComponent";
import ThreeStories from "../components/ThreeStories";
const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const AcmeLogo = () => (
    <svg
      className=""
      fill="none"
      height="36"
      viewBox="0 0 32 32"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-col">
        <NavbarComponent />
      </header>
      <main>
        <Hero />
        <ThreeStories />
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </Container>
  );
};

export default Home;
