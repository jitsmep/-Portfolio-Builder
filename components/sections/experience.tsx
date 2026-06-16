"use client";

import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";

export function Experience() {
  const { data } = useBuilder();

  return (
    <section id="experience" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="max-w-3xl">
          {data.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 gap-6 mb-12">
                <div className="md:col-span-1 mb-2 md:mb-0">
                  <div className="text-sm font-semibold text-primary">{exp.duration}</div>
                </div>
                <div className="md:col-span-3 relative">
                  {/* Timeline line and dot (hidden on small screens) */}
                  <div className="hidden md:block absolute -left-[35px] top-1.5 w-3 h-3 bg-primary rounded-full z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                  <div className="hidden md:block absolute -left-[29px] top-3 w-px h-full bg-white/10" />
                  
                  {/* Mobile timeline line and dot */}
                  <div className="md:hidden absolute -left-8 top-1.5 w-3 h-3 bg-primary rounded-full z-10" />
                  <div className="md:hidden absolute -left-[26px] top-3 w-px h-full bg-white/10" />

                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <h4 className="text-lg text-muted-foreground mb-4">{exp.company}</h4>
                  
                  <ul className="space-y-2 text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2 text-primary">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
