"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useBuilder } from "@/context/BuilderContext";
import * as Icons from "react-icons/si";
import { FaCode } from "react-icons/fa";

export function About() {
  const { data } = useBuilder();

  // Helper to dynamically render react-icons/si if they match the string name
  const renderIcon = (iconName: string) => {
    if (iconName.startsWith("data:image")) {
      return <img src={iconName} className="w-4 h-4 mr-2 object-contain inline-block" alt="" />;
    }
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-4 h-4 mr-2 inline-block" />;
    }
    return <FaCode className="w-4 h-4 mr-2 inline-block" />;
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {data.personal.bio}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold mb-6">Core Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="secondary" 
                  className="bg-black/50 hover:bg-black/70 border border-white/10 text-sm py-2 px-4 rounded-full transition-all hover:scale-105"
                >
                  {renderIcon(skill.icon)}
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
