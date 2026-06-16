"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Editor Pane */}
      {!isFullscreen && (
        <div className="w-[400px] flex-shrink-0 h-full border-r border-white/10 overflow-y-auto bg-black/5 backdrop-blur-xl z-50">
          <EditorSidebar onToggleFullscreen={() => setIsFullscreen(true)} />
        </div>
      )}

      {/* Preview Pane */}
      <div className="flex-1 h-full overflow-y-auto relative bg-background">
        {isFullscreen && (
          <Button 
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-2xl px-6 py-6"
            onClick={() => setIsFullscreen(false)}
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Edit Portfolio
          </Button>
        )}
        <div className={`w-full transform origin-top left-0 ${!isFullscreen ? "min-w-[800px]" : ""}`}>
          <Navbar />
          <div className="flex flex-col gap-0 w-full overflow-hidden pt-20">
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
