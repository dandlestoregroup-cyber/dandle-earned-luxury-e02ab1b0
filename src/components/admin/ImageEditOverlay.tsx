import { useCallback, useEffect, useRef } from "react";
import { useImageEditor } from "@/hooks/useImageEditor";
import { cdnUrl } from "@/lib/imageUrl";
import ImageEditorToolkit from "./ImageEditorToolkit";
import { Check, X } from "lucide-react";

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images`;

/** Parse an img.src back to its canonical storagePath, e.g. "/images/foo.jpg" */
function extractStoragePath(src: string): string | null {
  if (!src) return null;
  // CDN URL pattern
  const idx = src.indexOf("/storage/v1/object/public/product-images");
  if (idx !== -1) {
    let path = src.slice(idx + "/storage/v1/object/public/product-images".length);
    // Strip query params
    const q = path.indexOf("?");
    if (q !== -1) path = path.slice(0, q);
    return path.startsWith("/") ? path : "/" + path;
  }
  // Local /images/ path
  if (src.startsWith("/images/")) {
    return src.split("?")[0];
  }
  return null;
}

interface Props {
  children: React.ReactNode;
}

const ImageEditOverlay = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activePath, activeImgEl, pendingEdits, setActive, approve, discard } = useImageEditor();

  // Hover styling
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const img = (e.target as HTMLElement).closest("img") as HTMLImageElement | null;
    if (!img) return;
    const path = extractStoragePath(img.src) || extractStoragePath(img.getAttribute("data-original-src") || "");
    if (!path) return;
    img.style.outline = "2px dashed #E67E22";
    img.style.outlineOffset = "2px";
    img.style.cursor = "pointer";
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const img = (e.target as HTMLElement).closest("img") as HTMLImageElement | null;
    if (!img) return;
    img.style.outline = "";
    img.style.outlineOffset = "";
    img.style.cursor = "";
  }, []);

  // Click handler via event delegation
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest("img") as HTMLImageElement | null;
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();

      const originalSrc = img.getAttribute("data-original-src") || img.src;
      const path = extractStoragePath(originalSrc);
      if (!path) return;

      setActive(path, img);
    },
    [setActive]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("click", handleClick, true);
    el.addEventListener("mouseover", handleMouseOver);
    el.addEventListener("mouseout", handleMouseOut);
    return () => {
      el.removeEventListener("click", handleClick, true);
      el.removeEventListener("mouseover", handleMouseOver);
      el.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleClick, handleMouseOver, handleMouseOut]);

  // Apply pending edit previews to img elements
  useEffect(() => {
    if (!containerRef.current) return;
    const imgs = containerRef.current.querySelectorAll<HTMLImageElement>("img");
    imgs.forEach((img) => {
      const origSrc = img.getAttribute("data-original-src") || img.src;
      const path = extractStoragePath(origSrc);
      if (!path) return;

      // Save original src
      if (!img.getAttribute("data-original-src")) {
        img.setAttribute("data-original-src", img.src);
      }

      const edit = pendingEdits[path];
      if (edit) {
        img.src = edit.previewDataUrl;
      }
    });
  }, [pendingEdits]);

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Pending edit badges */}
      <PendingBadges containerRef={containerRef} />

      {/* Toolkit */}
      {activePath && activeImgEl && (
        <ImageEditorToolkit />
      )}
    </div>
  );
};

/** Render Approve/Discard badges for images with pending edits */
function PendingBadges({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { pendingEdits, approve, discard, isApproving } = useImageEditor();
  const paths = Object.keys(pendingEdits);

  if (paths.length === 0) return null;

  return (
    <>
      {paths.map((path) => (
        <PendingBadge
          key={path}
          storagePath={path}
          containerRef={containerRef}
          onApprove={() => approve(path)}
          onDiscard={() => discard(path)}
          isApproving={isApproving}
        />
      ))}
    </>
  );
}

function PendingBadge({
  storagePath,
  containerRef,
  onApprove,
  onDiscard,
  isApproving,
}: {
  storagePath: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onApprove: () => void;
  onDiscard: () => void;
  isApproving: boolean;
}) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !badgeRef.current) return;
    // Find the img with this storagePath
    const imgs = containerRef.current.querySelectorAll<HTMLImageElement>("img");
    for (const img of imgs) {
      const origSrc = img.getAttribute("data-original-src") || img.src;
      const path = extractStoragePath(origSrc);
      if (path === storagePath) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        badgeRef.current.style.top = `${imgRect.top - containerRect.top + 8}px`;
        badgeRef.current.style.left = `${imgRect.left - containerRect.left + 8}px`;
        return;
      }
    }
  });

  return (
    <div ref={badgeRef} className="absolute z-50 flex gap-1">
      <button
        onClick={(e) => { e.stopPropagation(); onApprove(); }}
        disabled={isApproving}
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded shadow-lg disabled:opacity-50"
      >
        <Check className="w-3 h-3" /> Approve
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDiscard(); }}
        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded shadow-lg"
      >
        <X className="w-3 h-3" /> Discard
      </button>
    </div>
  );
}

export default ImageEditOverlay;
export { extractStoragePath };
