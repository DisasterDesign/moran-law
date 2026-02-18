"use client";

import { useState } from "react";
import LogoIntro from "./LogoIntro";
import HomeHero from "./HomeHero";

export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <LogoIntro onComplete={() => setIntroDone(true)} />}
      <HomeHero introDone={introDone} />
      {children}
    </>
  );
}
