"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

export function Contact() {
  const { data } = useBuilder();

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center bg-black/5 dark:bg-white/5 backdrop-blur-xl p-12 rounded-3xl border border-black/10 dark:border-white/10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8" />
          
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            I&apos;m currently open to new opportunities. Whether you have a question, a project proposal, 
            or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          {data.personal.email && (
            <a href={`mailto:${data.personal.email}`}>
              <Button size="lg" className="rounded-full px-8 group">
                <Mail className="mr-2 w-5 h-5" />
                Say Hello
              </Button>
            </a>
          )}
          
          {data.personal.email && (
            <div className="mt-6 text-sm text-muted-foreground">
              Or email me directly at: <br />
              <a href={`mailto:${data.personal.email}`} className="text-primary hover:underline font-medium mt-2 inline-block text-lg">
                {data.personal.email}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
