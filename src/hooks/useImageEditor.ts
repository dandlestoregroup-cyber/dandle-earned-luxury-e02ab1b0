import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import { cdnUrl, markImageUpdated } from "@/lib/imageUrl";

interface PendingEdit {
  originalSrc: string;
  previewDataUrl: string;
  blob: Blob | null;
}

interface ImageEditorState {
  activePath: string | null;
  activeImgEl: HTMLImageElement | null;
  pendingEdits: Record<string, PendingEdit>;
  isApproving: boolean;

  setActive: (storagePath: string | null, imgEl: HTMLImageElement | null) => void;
  stageEdit: (storagePath: string, previewDataUrl: string, blob: Blob | null) => void;
  discard: (storagePath: string) => void;
  discardAll: () => void;
  approve: (storagePath: string) => Promise<void>;
  hasPending: (storagePath: string) => boolean;
  getPendingCount: () => number;
}

export const useImageEditor = create<ImageEditorState>((set, get) => ({
  activePath: null,
  activeImgEl: null,
  pendingEdits: {},
  isApproving: false,

  setActive: (storagePath, imgEl) => set({ activePath: storagePath, activeImgEl: imgEl }),

  stageEdit: (storagePath, previewDataUrl, blob) =>
    set((s) => {
      const existing = s.pendingEdits[storagePath];
      return {
        pendingEdits: {
          ...s.pendingEdits,
          [storagePath]: {
            originalSrc: existing?.originalSrc ?? cdnUrl(storagePath),
            previewDataUrl,
            blob,
          },
        },
      };
    }),

  discard: (storagePath) =>
    set((s) => {
      const next = { ...s.pendingEdits };
      delete next[storagePath];
      // Also restore the img element if it's the active one
      return {
        pendingEdits: next,
        ...(s.activePath === storagePath ? { activePath: null, activeImgEl: null } : {}),
      };
    }),

  discardAll: () => set({ pendingEdits: {}, activePath: null, activeImgEl: null }),

  approve: async (storagePath: string) => {
    const state = get();
    const edit = state.pendingEdits[storagePath];
    if (!edit || !edit.blob) return;

    set({ isApproving: true });

    try {
      // Upload to the canonical path with upsert
      // storagePath looks like "/images/filename.jpg" — strip leading slash for storage
      const uploadPath = storagePath.startsWith("/") ? storagePath.slice(1) : storagePath;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(uploadPath, edit.blob, {
          upsert: true,
          cacheControl: "max-age=0, must-revalidate",
          contentType: edit.blob.type || "image/webp",
        });

      if (error) throw error;

      // Persist cache-bust so ALL pages (including main site) pick up the new image
      markImageUpdated(storagePath);

      // Force-refresh: update the img element src with cache buster
      const freshUrl = cdnUrl(storagePath);

      // Update all matching img elements on the page
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (img.src.includes(uploadPath) || img.src === edit.previewDataUrl) {
          img.src = freshUrl;
        }
      });

      // Clear this pending edit
      set((s) => {
        const next = { ...s.pendingEdits };
        delete next[storagePath];
        return {
          pendingEdits: next,
          isApproving: false,
          ...(s.activePath === storagePath ? { activePath: null, activeImgEl: null } : {}),
        };
      });
    } catch (err) {
      console.error("Approve upload failed:", err);
      set({ isApproving: false });
      throw err;
    }
  },

  hasPending: (storagePath) => !!get().pendingEdits[storagePath],
  getPendingCount: () => Object.keys(get().pendingEdits).length,
}));
