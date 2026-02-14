import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return new Response(
        JSON.stringify({ error: "images array required: [{ filename, sourceUrl }]" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: Array<{ filename: string; success: boolean; error?: string }> = [];

    for (const { filename, sourceUrl, base64, contentType: providedType } of images) {
      try {
        let uint8Array: Uint8Array;
        let contentType: string;

        if (base64) {
          // Direct base64 upload (for embedded doc images)
          const raw = atob(base64);
          uint8Array = new Uint8Array(raw.length);
          for (let i = 0; i < raw.length; i++) uint8Array[i] = raw.charCodeAt(i);
          contentType = providedType || "image/webp";
        } else if (sourceUrl) {
          // Fetch from external CDN
          const response = await fetch(sourceUrl);
          if (!response.ok) {
            results.push({ filename, success: false, error: `Fetch failed: ${response.status}` });
            continue;
          }
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();
          uint8Array = new Uint8Array(arrayBuffer);
          contentType = blob.type || "image/webp";
        } else {
          results.push({ filename, success: false, error: "sourceUrl or base64 required" });
          continue;
        }

        const storagePath = `images/${filename}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(storagePath, uint8Array, {
            contentType,
            upsert: true,
          });

        if (uploadError) {
          results.push({ filename, success: false, error: uploadError.message });
        } else {
          results.push({ filename, success: true });
        }
      } catch (err) {
        results.push({ filename, success: false, error: String(err) });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return new Response(
      JSON.stringify({ results, successCount, totalCount: images.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
