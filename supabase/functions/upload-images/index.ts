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

    const { filenames, sourceBaseUrl } = await req.json();

    if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
      return new Response(
        JSON.stringify({ error: "filenames array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: Array<{ filename: string; success: boolean; error?: string }> = [];

    for (const filename of filenames) {
      try {
        // Fetch the image from the deployed site
        const imageUrl = `${sourceBaseUrl}/images/${filename}`;
        const response = await fetch(imageUrl);

        if (!response.ok) {
          results.push({ filename, success: false, error: `Fetch failed: ${response.status}` });
          continue;
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Determine content type
        const ext = filename.split(".").pop()?.toLowerCase();
        const contentTypeMap: Record<string, string> = {
          webp: "image/webp",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
        };
        const contentType = contentTypeMap[ext || ""] || "image/jpeg";

        // Upload to storage bucket under /images/ prefix
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
      JSON.stringify({ results, successCount, totalCount: filenames.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
