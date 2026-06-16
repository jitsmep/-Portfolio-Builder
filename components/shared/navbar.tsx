"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useBuilder } from "@/context/BuilderContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { data } = useBuilder();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-end gap-12">
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
