import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { cdnUrl } from "@/lib/imageUrl";
import { Loader2, Play, PlayCircle, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProduct {
  name: string;
  filename: string;
  width: number;
  height: number;
  prompt: string;
  category: string;
}

const HERO_PRODUCTS: HeroProduct[] = [
  {
    name: "RelaxMax",
    filename: "dandle-relaxmax-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle RelaxMax recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Off-white premium leather recliner, visible grain texture\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle (hides controls on right armrest)\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "RelaxMax Limited",
    filename: "dandle-relaxmax-limited-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle RelaxMax Limited Edition recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Camel full-grain leather, 360-degree swivel base visible, dual cup holders\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and leather texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "SpaceSaver",
    filename: "dandle-spacesaver-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle SpaceSaver wall-hugger recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Alexandria Linen fabric, compact 75cm width\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "Diva",
    filename: "dandle-diva-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle Diva recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Desert Sage microsuede, bold personality chair\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and rich fabric sheen\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "ComfortPlus",
    filename: "comfortplus-hero-new.jpg",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle ComfortPlus recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Red fabric recliner, thick plush cushioning\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "CozyCompanion",
    filename: "cozycompanion-hero-new.jpg",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle CozyCompanion loveseat scene into a clean 1024x1024 product card image.\n- Preserve the lifestyle composition (mother and daughter)\n- Center the subjects, consistent crop and framing\n- Warm natural lighting\n- Sharp focus, professional photography quality\n- Consistent 1:1 square framing matching other product cards",
  },
  {
    name: "WorkNest",
    filename: "dandle-worknest-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle WorkNest recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Oasis Green fabric, laptop tray attached and visible, brushed metal cupholder\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "EasyUp Standard",
    filename: "dandle-easyup-standard-hero.jpg",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle EasyUp Standard lift recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Mocha Taupe fabric, lift base mechanism visible\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "EasyUp Compact",
    filename: "dandle-easyup-compact-hero.webp",
    width: 1024, height: 1024,
    category: "heroes",
    prompt: "Reframe this Dandle EasyUp Compact recliner into a clean 1024x1024 product card image.\n- Pure white background\n- Coastal Fog grey fabric, compact footprint\n- Chair occupies 55-65% of frame, perfectly centered\n- 45-degree LEFT camera angle\n- Preserve 100% of original chair design, color, and fabric texture\n- Sharp focus, studio-quality lighting\n- No props, no background elements\n- Professional e-commerce product photography",
  },
  {
    name: "Complete Set",
    filename: "dandle-complete-set-hero.webp",
    width: 1920, height: 1080,
    category: "heroes",
    prompt: "Reframe this Dandle Complete Living Room Set into a 1920x1080 landscape image.\n- 3-piece set (two recliners + loveseat) arranged cohesively\n- Warm modern living room setting\n- Golden hour lighting\n- Chair designs must remain IDENTICAL to source\n- Professional interior photography quality\n- Warm cream and neutral tones",
  },
];

type Status = "idle" | "loading" | "success" | "error";

interface ProductState {
  status: Status;
  resultUrl?: string;
  error?: string;
}

const RegenerateHeroes = () => {
  const [states, setStates] = useState<Record<string, ProductState>>(
    Object.fromEntries(HERO_PRODUCTS.map((p) => [p.filename, { status: "idle" }]))
  );
  const [batchRunning, setBatchRunning] = useState(false);
  const abortRef = useRef(false);

  const updateState = (filename: string, update: Partial<ProductState>) => {
    setStates((prev) => ({ ...prev, [filename]: { ...prev[filename], ...update } }));
  };

  const generateOne = async (product: HeroProduct): Promise<boolean> => {
    updateState(product.filename, { status: "loading", resultUrl: undefined, error: undefined });

    try {
      // Fetch current image and convert to base64
      const imgUrl = cdnUrl(`/images/${product.filename}`);
      const resp = await fetch(imgUrl);
      if (!resp.ok) throw new Error(`Failed to fetch source image: ${resp.status}`);
      const blob = await resp.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // Call generate-site-image edge function
      const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site-image`;
      const genResp = await fetch(fnUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceImage: base64,
          prompt: product.prompt,
          filename: product.filename,
          dimensions: { width: product.width, height: product.height },
          category: product.category,
          productHandle: product.name.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      if (genResp.status === 429) {
        updateState(product.filename, { status: "error", error: "Rate limited — try again shortly" });
        return false;
      }
      if (genResp.status === 402) {
        updateState(product.filename, { status: "error", error: "Credits required" });
        return false;
      }
      if (!genResp.ok) {
        const err = await genResp.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || `HTTP ${genResp.status}`);
      }

      const result = await genResp.json();
      updateState(product.filename, { status: "success", resultUrl: result.imageUrl });
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      updateState(product.filename, { status: "error", error: msg });
      toast({ title: `Failed: ${product.name}`, description: msg, variant: "destructive" });
      return false;
    }
  };

  const generateAll = async () => {
    setBatchRunning(true);
    abortRef.current = false;

    for (const product of HERO_PRODUCTS) {
      if (abortRef.current) break;
      await generateOne(product);
      // Rate limit delay
      if (!abortRef.current) await new Promise((r) => setTimeout(r, 3000));
    }

    setBatchRunning(false);
    toast({ title: "Batch complete", description: "All hero images processed." });
  };

  const stopBatch = () => {
    abortRef.current = true;
  };

  const doneCount = Object.values(states).filter((s) => s.status === "success").length;
  const progress = (doneCount / HERO_PRODUCTS.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/images">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Regenerate Hero Images</h1>
          <p className="text-sm text-muted-foreground">AI image-to-image: consistent 1024×1024 heroes</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{doneCount}/{HERO_PRODUCTS.length} done</Badge>
          {batchRunning ? (
            <Button variant="destructive" onClick={stopBatch}>Stop</Button>
          ) : (
            <Button onClick={generateAll} className="gap-2">
              <PlayCircle className="w-4 h-4" /> Generate All
            </Button>
          )}
        </div>
      </div>

      {batchRunning && <Progress value={progress} className="h-2" />}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {HERO_PRODUCTS.map((product) => {
          const state = states[product.filename];
          const currentUrl = cdnUrl(`/images/${product.filename}`);
          const isLandscape = product.width > product.height;

          return (
            <Card key={product.filename} className={`overflow-hidden ${state.status === "success" ? "ring-2 ring-green-500/50" : ""}`}>
              <CardHeader className="p-3 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {product.width}×{product.height}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 space-y-3">
                {/* Before / After */}
                <div className={`grid ${state.resultUrl ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
                  <div>
                    {state.resultUrl && <p className="text-[10px] text-muted-foreground mb-1">Before</p>}
                    <div className={`rounded overflow-hidden bg-muted ${isLandscape ? "aspect-video" : "aspect-square"}`}>
                      <img
                        src={currentUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {state.resultUrl && (
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-1">After</p>
                      <div className={`rounded overflow-hidden bg-muted ${isLandscape ? "aspect-video" : "aspect-square"}`}>
                        <img
                          src={state.resultUrl + `?t=${Date.now()}`}
                          alt={`${product.name} regenerated`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Status */}
                {state.status === "error" && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> {state.error}
                  </p>
                )}
                {state.status === "success" && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Generated
                  </p>
                )}

                {/* Action */}
                <Button
                  size="sm"
                  className="w-full gap-2"
                  disabled={state.status === "loading" || batchRunning}
                  onClick={() => generateOne(product)}
                >
                  {state.status === "loading" ? (
                    <><Loader2 className="w-3 h-3 animate-spin" /> Generating…</>
                  ) : (
                    <><Play className="w-3 h-3" /> Generate</>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RegenerateHeroes;
