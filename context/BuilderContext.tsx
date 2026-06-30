"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioData as initialData } from "@/data/portfolio";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  achievements: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  link: string;
};

export type Skill = {
  name: string;
  icon: string;
};

export type PortfolioData = {
  personal: {
    name: string;
    role: string;
    bio: string;
    email: string;
    resumeUrl: string;
    avatar?: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  blog: BlogPost[];
};

interface BuilderContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  updatePersonal: (fields: Partial<PortfolioData["personal"]>) => void;
  updateSocials: (fields: Partial<PortfolioData["personal"]["socials"]>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateBlog: (blog: BlogPost[]) => void;
  exportData: () => void;
  importData: (importedData: PortfolioData) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>({
    ...initialData,
    personal: {
      ...initialData.personal,
      resumeUrl: "/resume.pdf"
    }
  });
  const [mounted, setMounted] = useState(false);
  const isReadOnly = React.useRef(false);

  // Load from localStorage or URL on mount
  useEffect(() => {
    setMounted(true);

    if (window.location.pathname === '/view') {
      isReadOnly.current = true;
      const params = new URLSearchParams(window.location.search);
      const encodedData = params.get("data");
      
      if (encodedData) {
        try {
          const decoded = decodeURIComponent(escape(atob(encodedData)));
          setData(JSON.parse(decoded));
          return; // Skip loading from localStorage
        } catch (e) {
          console.error("Failed to parse URL data");
        }
      }
    }

    const saved = localStorage.getItem("portfolioBuilderData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved portfolio data");
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (mounted && !isReadOnly.current) {
      localStorage.setItem("portfolioBuilderData", JSON.stringify(data));
    }
  }, [data, mounted]);

  const updatePersonal = (fields: Partial<PortfolioData["personal"]>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...fields },
    }));
  };

  const updateSocials = (fields: Partial<PortfolioData["personal"]["socials"]>) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        socials: { ...prev.personal.socials, ...fields },
      },
    }));
  };

  const updateSkills = (skills: Skill[]) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const updateExperience = (experience: Experience[]) => {
    setData((prev) => ({ ...prev, experience }));
  };

  const updateBlog = (blog: BlogPost[]) => {
    setData((prev) => ({ ...prev, blog }));
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "portfolio-data.json";
    link.click();
  };

  const importData = (importedData: PortfolioData) => {
    setData(importedData);
  };

  return (
    <BuilderContext.Provider
      value={{ data, setData, updatePersonal, updateSocials, updateSkills, updateProjects, updateExperience, updateBlog, exportData, importData }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
