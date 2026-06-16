"use client";

import { useBuilder } from "@/context/BuilderContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Maximize2, Download, Upload, Plus, Trash, Image as ImageIcon } from "lucide-react";
import React, { useRef } from "react";

interface EditorSidebarProps {
  onToggleFullscreen?: () => void;
}

export function EditorSidebar({ onToggleFullscreen }: EditorSidebarProps) {
  const { data, updatePersonal, updateSocials, updateSkills, updateProjects, updateExperience, exportData, importData } = useBuilder();
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
                  <Label>Profile Picture</Label>
                  <div className="flex gap-2 items-center">
                    <Button variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                      Upload Image
                    </Button>
                    <input 
                      id="avatar-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updatePersonal({ avatar: event.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }} 
                    />
                    {data.personal.avatar && (
                      <Button variant="ghost" className="text-red-500" onClick={() => updatePersonal({ avatar: "" })}>Remove</Button>
                    )}
                  </div>
                </div>
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
                  <AccordionContent className="space-y-4">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2 items-start border border-white/10 p-3 rounded-md">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[index].name = e.target.value;
                              updateSkills(newSkills);
                            }}
                            placeholder="Skill Name"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={skill.icon}
                              onChange={(e) => {
                                const newSkills = [...data.skills];
                                newSkills[index].icon = e.target.value;
                                updateSkills(newSkills);
                              }}
                              placeholder="Icon Name (e.g. SiReact)"
                              className="flex-1"
                            />
                            <Button variant="outline" size="icon" onClick={() => document.getElementById(`skill-icon-${index}`)?.click()}>
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                            <input
                              id={`skill-icon-${index}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const newSkills = [...data.skills];
                                  newSkills[index].icon = event.target?.result as string;
                                  updateSkills(newSkills);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                          const newSkills = data.skills.filter((_, i) => i !== index);
                          updateSkills(newSkills);
                        }}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => {
                      updateSkills([...data.skills, { name: "New Skill", icon: "FaCode" }]);
                    }}>
                      <Plus className="w-4 h-4 mr-2" /> Add Skill
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="projects">
                  <AccordionTrigger>Projects</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div key={project.id || index} className="space-y-3 border border-white/10 p-3 rounded-md relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => {
                          const newProjects = data.projects.filter((_, i) => i !== index);
                          updateProjects(newProjects);
                        }}>
                          <Trash className="w-4 h-4" />
                        </Button>
                        <div className="pr-8">
                          <Label>Title</Label>
                          <Input value={project.title} onChange={e => {
                            const newProjects = [...data.projects];
                            newProjects[index].title = e.target.value;
                            updateProjects(newProjects);
                          }} />
                        </div>
                        <Label>Category</Label>
                        <Input value={project.category} onChange={e => {
                          const newProjects = [...data.projects];
                          newProjects[index].category = e.target.value;
                          updateProjects(newProjects);
                        }} />
                        <Label>Description</Label>
                        <Textarea rows={3} value={project.description} onChange={e => {
                          const newProjects = [...data.projects];
                          newProjects[index].description = e.target.value;
                          updateProjects(newProjects);
                        }} />
                        <Label>Tags (comma separated)</Label>
                        <Input value={project.tags.join(", ")} onChange={e => {
                          const newProjects = [...data.projects];
                          newProjects[index].tags = e.target.value.split(",").map(t => t.trim());
                          updateProjects(newProjects);
                        }} />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>GitHub URL</Label>
                            <Input value={project.githubUrl} onChange={e => {
                              const newProjects = [...data.projects];
                              newProjects[index].githubUrl = e.target.value;
                              updateProjects(newProjects);
                            }} />
                          </div>
                          <div>
                            <Label>Live URL</Label>
                            <Input value={project.liveUrl} onChange={e => {
                              const newProjects = [...data.projects];
                              newProjects[index].liveUrl = e.target.value;
                              updateProjects(newProjects);
                            }} />
                          </div>
                        </div>
                        <Label>Project Image</Label>
                        <div className="flex gap-2">
                          <Input value={project.image} onChange={e => {
                              const newProjects = [...data.projects];
                              newProjects[index].image = e.target.value;
                              updateProjects(newProjects);
                          }} placeholder="Image URL or upload ->" />
                          <Button variant="outline" onClick={() => document.getElementById(`project-img-${index}`)?.click()}>
                            Upload
                          </Button>
                          <input
                            id={`project-img-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newProjects = [...data.projects];
                                newProjects[index].image = event.target?.result as string;
                                updateProjects(newProjects);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => {
                      updateProjects([...data.projects, {
                        id: `project-${Date.now()}`,
                        title: "New Project",
                        description: "",
                        image: "https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?w=800&q=80",
                        tags: [],
                        githubUrl: "",
                        liveUrl: "",
                        category: "Web"
                      }]);
                    }}>
                      <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="experience">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {data.experience.map((exp, index) => (
                      <div key={exp.id || index} className="space-y-3 border border-white/10 p-3 rounded-md relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => {
                          const newExp = data.experience.filter((_, i) => i !== index);
                          updateExperience(newExp);
                        }}>
                          <Trash className="w-4 h-4" />
                        </Button>
                        <div className="pr-8">
                          <Label>Role</Label>
                          <Input value={exp.role} onChange={e => {
                            const newExp = [...data.experience];
                            newExp[index].role = e.target.value;
                            updateExperience(newExp);
                          }} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Company</Label>
                            <Input value={exp.company} onChange={e => {
                              const newExp = [...data.experience];
                              newExp[index].company = e.target.value;
                              updateExperience(newExp);
                            }} />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input value={exp.duration} onChange={e => {
                              const newExp = [...data.experience];
                              newExp[index].duration = e.target.value;
                              updateExperience(newExp);
                            }} />
                          </div>
                        </div>
                        <Label>Achievements (one per line)</Label>
                        <Textarea rows={4} value={exp.achievements.join("\n")} onChange={e => {
                          const newExp = [...data.experience];
                          newExp[index].achievements = e.target.value.split("\n");
                          updateExperience(newExp);
                        }} />
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => {
                      updateExperience([...data.experience, {
                        id: `exp-${Date.now()}`,
                        company: "Company",
                        role: "Role",
                        duration: "2024 - Present",
                        achievements: ["Achievement 1"]
                      }]);
                    }}>
                      <Plus className="w-4 h-4 mr-2" /> Add Experience
                    </Button>
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
