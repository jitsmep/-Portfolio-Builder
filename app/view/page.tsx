"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function ViewPortfolio() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if ?data= is present
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (!data) {
      // Redirect to builder if no data is provided
      router.push("/");
    } else {
      setIsValid(true);
    }
  }, [router]);

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-background">
      <div className="flex-1 w-full relative bg-background">
        <div className="w-full transform origin-top left-0">
          <Navbar />
          <div className="flex flex-col gap-0 w-full pt-20">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Blog />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
