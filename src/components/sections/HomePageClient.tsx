"use client";

import { useState } from "react";
import LogoIntro from "./LogoIntro";
import HomeHero from "./HomeHero";

export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hasSeenIntroAnimation") === "true";
    }
    return false;
  });

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem("hasSeenIntroAnimation", "true");
  };

  return (
    <>
      {!introDone && <LogoIntro onComplete={handleIntroComplete} />}
      <HomeHero introDone={introDone} />
      {children}
    </>
  );
}
