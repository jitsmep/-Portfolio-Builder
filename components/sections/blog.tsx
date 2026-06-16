"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

export function Blog() {
  const { data } = useBuilder();

  if (!data.blog || data.blog.length === 0) return null;

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Latest Articles</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
          
          <a href="#" className="text-primary hover:underline flex items-center group">
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.blog.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="block group h-full">
                <Card className="glass-card h-full border-white/10 group-hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-md">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
