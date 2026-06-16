"use client";

import { useBuilder } from "@/context/BuilderContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Maximize2, Download, Upload } from "lucide-react";
import React, { useRef } from "react";

interface EditorSidebarProps {
  onToggleFullscreen?: () => void;
}

export function EditorSidebar({ onToggleFullscreen }: EditorSidebarProps) {
  const { data, updatePersonal, updateSocials, exportData, importData } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        importData(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Builder</h2>
        <div className="flex gap-2">
          {onToggleFullscreen && (
            <Button variant="ghost" size="icon" onClick={onToggleFullscreen} title="Preview Fullscreen">
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} title="Import JSON">
            <Upload className="w-4 h-4" />
          </Button>
          <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
          
          <Button variant="ghost" size="icon" onClick={exportData} title="Export JSON">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={data.personal.name} 
                    onChange={(e) => updatePersonal({ name: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role / Title</Label>
                  <Input 
                    value={data.personal.role} 
                    onChange={(e) => updatePersonal({ role: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea 
                    value={data.personal.bio} 
                    onChange={(e) => updatePersonal({ bio: e.target.value })} 
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={data.personal.email} 
                    onChange={(e) => updatePersonal({ email: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Resume Link (PDF URL)</Label>
                  <Input 
                    value={data.personal.resumeUrl} 
                    onChange={(e) => updatePersonal({ resumeUrl: e.target.value })} 
                    placeholder="/resume.pdf or https://..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Social Links</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input 
                      value={data.personal.socials.github} 
                      onChange={(e) => updateSocials({ github: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input 
                      value={data.personal.socials.linkedin} 
                      onChange={(e) => updateSocials({ linkedin: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter URL</Label>
                    <Input 
                      value={data.personal.socials.twitter} 
                      onChange={(e) => updateSocials({ twitter: e.target.value })} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <Accordion className="w-full">
                <AccordionItem value="skills">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-muted-foreground mb-4">Edit skills in the JSON export for now.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="projects">
                  <AccordionTrigger>Projects</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-muted-foreground mb-4">Edit projects in the JSON export for now.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="experience">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs text-muted-foreground mb-4">Edit experience in the JSON export for now.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
