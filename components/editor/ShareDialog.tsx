"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Download, AlertTriangle } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { QRCodeCanvas } from "qrcode.react";

export function ShareDialog() {
  const { data } = useBuilder();
  const [shareUrl, setShareUrl] = useState("");
  const [hasBase64Images, setHasBase64Images] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for base64 images that might make the URL too long
    const avatarIsBase64 = data.personal.avatar?.startsWith("data:image/") || false;
    const projectsHaveBase64 = data.projects.some(p => p.image?.startsWith("data:image/"));
    const skillsHaveBase64 = data.skills.some(s => s.icon?.startsWith("data:image/"));
    
    setHasBase64Images(avatarIsBase64 || projectsHaveBase64 || skillsHaveBase64);

    // Generate the share URL
    try {
      const jsonString = JSON.stringify(data);
      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      const url = `${window.location.origin}/view?data=${encodedData}`;
      setShareUrl(url);
    } catch (e) {
      console.error("Failed to generate share URL", e);
    }
  }, [data]);

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "portfolio-qr.png";
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon" title="Share Portfolio" />}>
        <Share2 className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Portfolio</DialogTitle>
          <DialogDescription>
            Anyone with this link or QR code will be able to view your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {hasBase64Images && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-3 rounded-md flex items-start gap-2 text-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Warning:</strong> You are using uploaded local images. This makes the generated link very long and might break sharing in some browsers. Consider using public image URLs (like Imgur) instead.
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
            />
            <Button size="sm" className="px-3" onClick={handleCopy}>
              {copied ? (
                <span className="text-xs">Copied!</span>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center pt-4 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-4">Or share via QR Code</p>
            {shareUrl.length < 2000 ? (
              <>
                <div className="bg-white p-4 rounded-xl mb-4" ref={qrRef}>
                  <QRCodeCanvas 
                    value={shareUrl || "https://example.com"} 
                    size={200}
                    level="L"
                    includeMargin={false}
                  />
                </div>
                <Button variant="outline" onClick={handleDownloadQR}>
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </>
            ) : (
              <div className="text-center p-4 border border-red-500/20 bg-red-500/10 text-red-500 rounded-md max-w-full">
                <p className="text-sm">URL is too long for a QR Code ({shareUrl.length} characters). Please remove local images and try again.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
