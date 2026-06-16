"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
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
          className="mb-12 md:mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, 
            I&apos;ll try my best to get back to you!
          </p>
          {data.personal.email && (
            <a href={`mailto:${data.personal.email}`} className="text-primary hover:underline mt-4 inline-block font-medium">
              {data.personal.email}
            </a>
          )}
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (Mock)");
            }}
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                placeholder="Hello..." 
                className="bg-white/5 border-white/10 min-h-[120px] resize-none" 
                required 
              />
            </div>
            
            <Button type="submit" className="w-full group">
              Send Message
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
