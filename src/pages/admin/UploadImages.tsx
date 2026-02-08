import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Check, AlertCircle, Upload, RefreshCw } from "lucide-react";

// All known image filenames from public/images/
const ALL_IMAGE_FILES = [
  "comfortplus-coastal-fog-lifestyle.webp",
  "comfortplus-tan-front.webp",
  "comfortplus-tan-lifestyle.webp",
  "complete-set-classic.jpg",
  "complete-set-coastal-modern.jpg",
  "complete-set-family-modern.jpg",
  "complete-set-final.webp",
  "complete-set-hero.png",
  "complete-set-modern-fireplace.jpg",
  "complete-set-sunset-fireplace.jpg",
  "cozycompanion-beige-front.jpg",
  "cozycompanion-coastal-fog.webp",
  "cozycompanion-couple-lifestyle-2.webp",
  "cozycompanion-couple-lifestyle.jpg",
  "cozycompanion-couple-lifestyle.webp",
  "cozycompanion-hero-new.jpg",
  "cozycompanion-hero.png",
  "cozycompanion-lifestyle-elder.webp",
  "cozycompanion-mocha-taupe-2.webp",
  "cozycompanion-mocha-taupe-front.webp",
  "cozycompanion-mocha-taupe.webp",
  "cozycompanion-yellow-front.jpg",
  "dandle-comfortplus.jpg",
  "dandle-complete-set-hero.webp",
  "dandle-cozycompanion-hero.webp",
  "dandle-diva-hero.webp",
  "dandle-diva.jpg",
  "dandle-easyup-compact-hero.webp",
  "dandle-easyup-compact.jpg",
  "dandle-easyup-standard-hero.jpg",
  "dandle-easyup-standard-hero.webp",
  "dandle-easyup-standard.jpg",
  "dandle-heritage-set.jpg",
  "dandle-omash-partnership.webp",
  "dandle-partnerships-room.png",
  "dandle-relaxmax-flagship.webp",
  "dandle-relaxmax-hero.webp",
  "dandle-relaxmax-limited-hero.webp",
  "dandle-relaxmax.jpg",
  "dandle-spacesaver-hero.webp",
  "dandle-spacesaver.jpg",
  "dandle-worknest-hero.webp",
  "dandle-worknest.jpg",
  "diva-desert-sage-green.webp",
  "diva-giza-gold.webp",
  "diva-oasis-green-reclined.webp",
  "diva-oasis-green.webp",
  "diva-primary-terracotta.webp",
  "diva-primary.webp",
  "diva-red-front.jpg",
  "diva-terracotta-reclined.webp",
  "diva-terracotta.webp",
  "easyup-beige-front.jpg",
  "easyup-beige-lifted.jpg",
  "easyup-compact-charcoal-front.jpg",
  "easyup-compact-charcoal-reclined.png",
  "easyup-compact-charcoal-side.png",
  "easyup-compact-grey-front.webp",
  "easyup-compact-hero-new.jpg",
  "easyup-compact-oasis-green-2.webp",
  "easyup-compact-oasis-green.webp",
  "easyup-lift-assist-lifestyle-2.webp",
  "easyup-lift-assist-lifestyle.webp",
  "easyup-standard-coastal-fog.webp",
  "easyup-standard-grey-front.webp",
  "easyup-standard-grey-pregnant.webp",
  "easyup-standard-hero-new.jpg",
  "easyup-standard-hero.png",
  "easyup-standard-mocha-taupe-lifted.webp",
  "easyup-standard-mocha-taupe.webp",
  "easyup-standard-oasis-green.webp",
  "gift-lifestyle-cairo.jpg",
  "lifestyle-cairo-penthouse.jpg",
  "lifestyle-reading-nook.jpg",
  "relaxmax-alexandria-linen.webp",
  "relaxmax-brown-lifestyle.jpg",
  "relaxmax-coastal-fog.webp",
  "relaxmax-cognac-leather.webp",
  "relaxmax-hero-offwhite.jpg",
  "relaxmax-hero.png",
  "relaxmax-lifestyle-day.png",
  "relaxmax-lifestyle-elder.webp",
  "relaxmax-lifestyle-night.png",
  "relaxmax-limited-mocha-taupe.webp",
  "relaxmax-mocha-taupe.webp",
  "relaxmax-primary-cognac.webp",
  "relaxmax-primary.webp",
  "spacesaver-burgundy-lifestyle.webp",
  "spacesaver-desert-grey-reclined.webp",
  "spacesaver-desert-grey.webp",
  "spacesaver-hero.png",
  "spacesaver-mocha-taupe-reclined.webp",
  "spacesaver-mocha-taupe.webp",
  "spacesaver-offwhite-reclined.jpg",
  "spacesaver-offwhite-side.jpg",
  "spacesaver-primary-linen.webp",
  "spacesaver-primary.webp",
  "spacesaver-red-front.webp",
  "spacesaver-terracotta-reclined.webp",
  "worknest-blue-front.webp",
  "worknest-blue-nile.webp",
  "worknest-desert-grey-reclined-2.webp",
  "worknest-desert-grey-reclined.webp",
  "worknest-desert-grey.webp",
  "worknest-hero.png",
  "worknest-oasis-green-lifestyle.webp",
  "worknest-oasis-green.webp",
  "worknest-primary-green.webp",
  "worknest-primary.webp",
];

const BATCH_SIZE = 5;

export default function UploadImages() {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<
    Array<{ filename: string; success: boolean; error?: string }>
  >([]);
  const [progress, setProgress] = useState(0);
  const [existingFiles, setExistingFiles] = useState<Set<string>>(new Set());
  const [checking, setChecking] = useState(true);

  // Check which files already exist in storage
  useEffect(() => {
    checkExisting();
  }, []);

  async function checkExisting() {
    setChecking(true);
    try {
      const { data, error } = await supabase.storage
        .from("product-images")
        .list("images", { limit: 500 });

      if (!error && data) {
        setExistingFiles(new Set(data.map((f) => f.name)));
      }
    } catch {
      // ignore
    }
    setChecking(false);
  }

  async function uploadAll(onlyMissing = true) {
    setUploading(true);
    setResults([]);
    setProgress(0);

    const filesToUpload = onlyMissing
      ? ALL_IMAGE_FILES.filter((f) => !existingFiles.has(f))
      : ALL_IMAGE_FILES;

    if (filesToUpload.length === 0) {
      setUploading(false);
      return;
    }

    const allResults: typeof results = [];
    const sourceBaseUrl = window.location.origin;

    for (let i = 0; i < filesToUpload.length; i += BATCH_SIZE) {
      const batch = filesToUpload.slice(i, i + BATCH_SIZE);

      try {
        const { data, error } = await supabase.functions.invoke(
          "upload-images",
          {
            body: { filenames: batch, sourceBaseUrl },
          }
        );

        if (error) {
          batch.forEach((f) =>
            allResults.push({ filename: f, success: false, error: String(error) })
          );
        } else if (data?.results) {
          allResults.push(...data.results);
        }
      } catch (err) {
        batch.forEach((f) =>
          allResults.push({ filename: f, success: false, error: String(err) })
        );
      }

      setProgress(Math.min(100, ((i + batch.length) / filesToUpload.length) * 100));
      setResults([...allResults]);
    }

    setUploading(false);
    // Refresh existing files list
    checkExisting();
  }

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const missingCount = ALL_IMAGE_FILES.filter((f) => !existingFiles.has(f)).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Cloud Image Migration
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload product images from public/images/ to cloud storage CDN
        </p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{ALL_IMAGE_FILES.length}</div>
          <div className="text-sm text-muted-foreground">Total images</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {checking ? "..." : existingFiles.size}
          </div>
          <div className="text-sm text-muted-foreground">Already in CDN</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-amber-600">
            {checking ? "..." : missingCount}
          </div>
          <div className="text-sm text-muted-foreground">Need upload</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => uploadAll(true)}
          disabled={uploading || checking || missingCount === 0}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Missing ({missingCount})
        </Button>
        <Button
          variant="outline"
          onClick={() => uploadAll(false)}
          disabled={uploading || checking}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Re-upload All
        </Button>
        <Button variant="ghost" onClick={checkExisting} disabled={checking}>
          Refresh Status
        </Button>
      </div>

      {/* Progress */}
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <div className="flex gap-4 text-sm">
            <span className="text-green-600">✓ {successCount} uploaded</span>
            {failCount > 0 && (
              <span className="text-red-600">✗ {failCount} failed</span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto rounded border divide-y">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 text-sm"
              >
                {r.success ? (
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                )}
                <span className="truncate">{r.filename}</span>
                {r.error && (
                  <span className="text-red-500 text-xs ml-auto truncate max-w-48">
                    {r.error}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
