import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import JSZip from "https://esm.sh/jszip@3.10.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'public, max-age=31536000, immutable',
};

// In-memory cache for extracted images
let imageCache: Map<string, { data: Uint8Array; contentType: string }> | null = null;
let extractionPromise: Promise<void> | null = null;

async function extractZipToCache(supabase: any): Promise<void> {
  console.log("Starting ZIP extraction to cache...");
  
  // Try to get ZIP from storage first
  let zipData: ArrayBuffer | null = null;
  
  const { data: storageData, error: storageError } = await supabase.storage
    .from('product-images')
    .download('Processed_Products.zip');
  
  if (storageData) {
    console.log("Found ZIP in storage");
    zipData = await storageData.arrayBuffer();
  } else {
    console.log("ZIP not in storage, uploading from public folder...", storageError);
    // Fallback: fetch from public URL and upload to storage
    const publicUrl = Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '') + '/Processed_Products.zip';
    console.log("Attempting fetch from:", publicUrl);
    
    // This won't work - we need the ZIP to be in storage
    throw new Error("ZIP file must be uploaded to storage bucket 'product-images'");
  }
  
  if (!zipData) {
    throw new Error("Failed to get ZIP data");
  }
  const zip = await JSZip.loadAsync(zipData);
  imageCache = new Map();
  
  for (const [path, file] of Object.entries(zip.files)) {
    if ((file as JSZip.JSZipObject).dir) continue;
    
    const ext = path.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) continue;
    
    const data = await (file as JSZip.JSZipObject).async('uint8array');
    const name = path.split('/').pop() || path;
    
    const contentType = ext === 'png' ? 'image/png' 
      : ext === 'webp' ? 'image/webp'
      : ext === 'gif' ? 'image/gif'
      : 'image/jpeg';
    
    imageCache.set(name.toLowerCase(), { data, contentType });
    console.log(`Cached: ${name}`);
  }
  
  console.log(`Extraction complete. ${imageCache.size} images cached.`);
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const imageName = url.pathname.split('/').pop();
    
    if (!imageName) {
      return new Response(JSON.stringify({ error: 'No image name provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Extract ZIP if not already cached
    if (!imageCache) {
      if (!extractionPromise) {
        extractionPromise = extractZipToCache(supabase);
      }
      await extractionPromise;
    }
    
    // Look up image in cache
    const image = imageCache?.get(imageName.toLowerCase());
    
    if (!image) {
      console.log(`Image not found: ${imageName}`);
      console.log(`Available images: ${Array.from(imageCache?.keys() || []).slice(0, 10).join(', ')}...`);
      
      return new Response(JSON.stringify({ 
        error: 'Image not found',
        requested: imageName,
        available: Array.from(imageCache?.keys() || []).slice(0, 20)
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(image.data.buffer as ArrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': image.contentType,
      },
    });
    
  } catch (error) {
    console.error('Error serving image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
