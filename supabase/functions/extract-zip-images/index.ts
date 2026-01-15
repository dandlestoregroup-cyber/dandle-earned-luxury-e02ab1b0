import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import JSZip from "https://esm.sh/jszip@3.10.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Check if ZIP exists in storage
    let zipData: ArrayBuffer | null = null;
    
    const { data: zipBlob, error: downloadError } = await supabase.storage
      .from('product-images')
      .download('Processed_Products.zip');
    
    if (zipBlob) {
      console.log("ZIP found in storage");
      zipData = await zipBlob.arrayBuffer();
    } else {
      console.log("ZIP not in storage, checking request body...", downloadError);
      
      // Try to get ZIP data from request body (base64 encoded)
      const body = await req.json().catch(() => null);
      if (body?.zipBase64) {
        console.log("Using ZIP from request body");
        const binaryString = atob(body.zipBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        zipData = bytes.buffer;
        
        // Also upload to storage for future use
        const { error: uploadZipError } = await supabase.storage
          .from('product-images')
          .upload('Processed_Products.zip', bytes, {
            contentType: 'application/zip',
            upsert: true,
          });
        
        if (uploadZipError) {
          console.error("Failed to cache ZIP in storage:", uploadZipError);
        } else {
          console.log("ZIP cached in storage");
        }
      } else {
        return new Response(JSON.stringify({ 
          error: 'ZIP not found. Please either upload Processed_Products.zip to storage or send base64 encoded ZIP in request body as zipBase64.',
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    console.log("Extracting ZIP...");
    const zip = await JSZip.loadAsync(zipData);
    
    const results: { name: string; uploaded: boolean; error?: string; productKey?: string; swatchKey?: string; path?: string }[] = [];
    
    // Parse filename patterns
    const parseFilename = (filename: string): { productKey?: string; swatchKey?: string } => {
      const lower = filename.toLowerCase();
      
      const productPatterns: Record<string, string> = {
        'relaxmax': 'relaxmax',
        'diva': 'diva',
        'cozycompanion': 'cozycompanion',
        'cozy-companion': 'cozycompanion',
        'comfortplus': 'comfortplus',
        'comfort-plus': 'comfortplus',
        'easyup-compact': 'easyup-compact',
        'easyup': 'easyup',
        'easy-up': 'easyup',
        'worknest': 'worknest',
        'work-nest': 'worknest',
        'spacesaver': 'spacesaver',
        'space-saver': 'spacesaver',
        'complete-set': 'complete-set',
        'completeset': 'complete-set',
      };
      
      const swatchPatterns: Record<string, string> = {
        'mocha-taupe': 'mocha-taupe',
        'mocha': 'mocha-taupe',
        'taupe': 'mocha-taupe',
        'beige': 'alexandria-linen',
        'linen': 'alexandria-linen',
        'offwhite': 'alexandria-linen',
        'off-white': 'alexandria-linen',
        'cream': 'alexandria-linen',
        'grey': 'desert-grey',
        'gray': 'desert-grey',
        'charcoal': 'desert-grey',
        'coastal': 'coastal-fog',
        'fog': 'coastal-fog',
        'gold': 'giza-gold',
        'yellow': 'giza-gold',
        'green': 'oasis-green',
        'oasis': 'oasis-green',
        'sage': 'desert-sage',
        'blue': 'nile-sapphire',
        'sapphire': 'nile-sapphire',
        'navy': 'nile-sapphire',
        'denim': 'blue-nile-denim',
        'red': 'nile-mist',
        'terracotta': 'nile-mist',
        'burgundy': 'nile-mist',
        'amber': 'amber-sand',
        'sand': 'amber-sand',
        'tan': 'amber-sand',
        'brown': 'mocha-taupe',
        'espresso': 'mocha-taupe',
      };
      
      let productKey: string | undefined;
      const sortedProducts = Object.keys(productPatterns).sort((a, b) => b.length - a.length);
      for (const key of sortedProducts) {
        if (lower.includes(key)) {
          productKey = productPatterns[key];
          break;
        }
      }
      
      let swatchKey: string | undefined;
      const sortedSwatches = Object.keys(swatchPatterns).sort((a, b) => b.length - a.length);
      for (const pattern of sortedSwatches) {
        if (lower.includes(pattern)) {
          swatchKey = swatchPatterns[pattern];
          break;
        }
      }
      
      return { productKey, swatchKey };
    };
    
    for (const [path, file] of Object.entries(zip.files)) {
      const zipFile = file as JSZip.JSZipObject;
      if (zipFile.dir) continue;
      
      const ext = path.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) continue;
      
      const name = path.split('/').pop() || path;
      const data = await zipFile.async('uint8array');
      const { productKey, swatchKey } = parseFilename(name);
      
      const contentType = ext === 'png' ? 'image/png' 
        : ext === 'webp' ? 'image/webp'
        : ext === 'gif' ? 'image/gif'
        : 'image/jpeg';
      
      // Upload to product subdirectory if product key is found, otherwise to extracted-products
      const uploadPath = productKey 
        ? `${productKey}/${name}` 
        : `extracted-products/${name}`;
      
      console.log(`Uploading: ${name} to ${uploadPath} (${productKey}/${swatchKey})`);
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(uploadPath, data, {
          contentType,
          upsert: true,
        });
      
      if (uploadError) {
        console.error(`Upload error for ${name}:`, uploadError);
        results.push({ name, uploaded: false, error: uploadError.message, productKey, swatchKey, path: uploadPath });
      } else {
        results.push({ name, uploaded: true, productKey, swatchKey, path: uploadPath });
      }
    }
    
    const successCount = results.filter(r => r.uploaded).length;
    console.log(`Extraction complete: ${successCount}/${results.length} images uploaded`);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: `Extracted and uploaded ${successCount} images`,
      results
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Extraction error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
