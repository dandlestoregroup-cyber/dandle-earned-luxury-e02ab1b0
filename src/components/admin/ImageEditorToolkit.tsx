import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useImageEditor } from "@/hooks/useImageEditor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Wand2, RefreshCw, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ImageEditorToolkit = () => {
  const { activePath, activeImgEl, setActive, stageEdit, approve, discard, pendingEdits, isApproving } = useImageEditor();
  const [tab, setTab] = useState<"upload" | "ai-edit" | "ai-regen">("upload");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolkitRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const hasPending = activePath ? !!pendingEdits[activePath] : false;
  const pendingPreview = activePath ? pendingEdits[activePath]?.previewDataUrl : null;

  // Position the toolkit near the active image
  useEffect(() => {
    if (!activeImgEl) return;
    const updatePosition = () => {
      const rect = activeImgEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const top = spaceBelow > 280 ? rect.bottom + 8 : Math.max(8, rect.top - 280);
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - 380));
      setPosition({ top, left });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => window.removeEventListener("scroll", updatePosition);
  }, [activeImgEl]);

  if (!activePath || !activeImgEl) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      stageEdit(activePath, dataUrl, file);
      toast({ title: "Image staged", description: "Click Approve to publish this change." });
    };
    reader.readAsDataURL(file);
  };

  const handleAiEdit = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = activeImgEl.naturalWidth || activeImgEl.width;
      canvas.height = activeImgEl.naturalHeight || activeImgEl.height;
      ctx.drawImage(activeImgEl, 0, 0);
      const base64 = canvas.toDataURL("image/webp", 0.9);

      const { data, error } = await supabase.functions.invoke("generate-site-image", {
        body: {
          referenceImage: base64,
          prompt: prompt.trim(),
          filename: activePath.split("/").pop() || "edited.webp",
          dimensions: { width: canvas.width, height: canvas.height },
          category: "homepage",
          preview: true,
        },
      });

      if (error) throw error;
      if (data?.imageData) {
        const blob = await fetch(data.imageData).then((r) => r.blob());
        stageEdit(activePath, data.imageData, blob);
        toast({ title: "AI edit staged", description: "Click Approve to publish." });
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (err: any) {
      console.error("AI edit failed:", err);
      toast({ title: "AI Edit failed", description: err.message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiRegen = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = activeImgEl.naturalWidth || activeImgEl.width;
      canvas.height = activeImgEl.naturalHeight || activeImgEl.height;
      ctx.drawImage(activeImgEl, 0, 0);
      const base64 = canvas.toDataURL("image/webp", 0.9);

      const { data, error } = await supabase.functions.invoke("generate-site-image", {
        body: {
          referenceImage: base64,
          prompt: "Enhance this image with better lighting, sharper details, and premium product photography quality. Keep the chair and scene identical.",
          filename: activePath.split("/").pop() || "regenerated.webp",
          dimensions: { width: canvas.width, height: canvas.height },
          category: "homepage",
          preview: true,
        },
      });

      if (error) throw error;
      if (data?.imageData) {
        const blob = await fetch(data.imageData).then((r) => r.blob());
        stageEdit(activePath, data.imageData, blob);
        toast({ title: "AI regeneration staged", description: "Click Approve to publish." });
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (err: any) {
      console.error("AI regen failed:", err);
      toast({ title: "AI Regenerate failed", description: err.message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = async () => {
    try {
      await approve(activePath);
      toast({ title: "Published!", description: "Image is now live on the homepage." });
    } catch (err: any) {
      toast({ title: "Publish failed", description: err.message, variant: "destructive" });
    }
  };

  const handleDiscard = () => {
    discard(activePath);
    const origSrc = activeImgEl.getAttribute("data-original-src");
    if (origSrc) activeImgEl.src = origSrc;
  };

  return createPortal(
    <div
      ref={toolkitRef}
      className="fixed z-[9999] w-[360px] bg-background border border-border rounded-xl shadow-2xl p-4"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground truncate max-w-[260px]">
          {activePath}
        </h3>
        <button onClick={() => setActive(null, null)} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {(["upload", "ai-edit", "ai-regen"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upload" ? "Upload" : t === "ai-edit" ? "AI Edit" : "AI Regen"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" /> Choose Image
          </Button>
        </div>
      )}

      {tab === "ai-edit" && (
        <div className="space-y-2">
          <Textarea
            placeholder="Describe the edit (e.g. 'Make the room warmer, add golden hour lighting')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="text-sm"
          />
          <Button
            className="w-full"
            onClick={handleAiEdit}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            {isGenerating ? "Generating..." : "Generate Edit"}
          </Button>
        </div>
      )}

      {tab === "ai-regen" && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            One-click regeneration with enhanced lighting and premium quality.
          </p>
          <Button
            className="w-full"
            onClick={handleAiRegen}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {isGenerating ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>
      )}

      {/* Staged Preview Thumbnail + Approve / Discard */}
      {hasPending && (
        <div className="mt-3 pt-3 border-t border-border">
          {pendingPreview && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">Staged preview:</p>
              <img
                src={pendingPreview}
                alt="Staged preview"
                className="w-full max-h-[120px] object-contain rounded-md border border-border bg-muted"
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={handleApprove}
              disabled={isApproving}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isApproving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
              Approve
            </Button>
            <Button variant="outline" onClick={handleDiscard} className="flex-1">
              <X className="w-4 h-4 mr-2" /> Discard
            </Button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageEditorToolkit;
