"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useBuilder } from "@/context/BuilderContext";

export function Footer() {
  const { data } = useBuilder();

  return (
    <footer className="border-t border-white/10 py-12 mt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            {data.personal.name.split(" ")[0]}<span className="text-primary">.</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {data.personal.socials.github && (
            <a
              href={data.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
            >
              <FaGithub className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
          {data.personal.socials.linkedin && (
            <a
              href={data.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {data.personal.socials.twitter && (
            <a
              href={data.personal.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
            >
              <FaTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
