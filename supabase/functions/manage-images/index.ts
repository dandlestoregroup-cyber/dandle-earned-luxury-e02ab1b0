import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BUCKET = "product-images";
const PREFIX = "images/";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    // GET — list all images
    if (req.method === "GET") {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("images", { limit: 1000, sortBy: { column: "name", order: "asc" } });

      if (error) return json({ error: error.message }, 500);

      const files = (data || [])
        .filter((f) => f.name && !f.name.startsWith("."))
        .map((f) => ({
          filename: f.name,
          size: f.metadata?.size ?? null,
          contentType: f.metadata?.mimetype ?? null,
          updatedAt: f.updated_at,
          url: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${PREFIX}${f.name}`,
        }));

      return json({ files, count: files.length });
    }

    // POST — upload/replace image
    if (req.method === "POST") {
      const { filename, base64, contentType } = await req.json();

      if (!filename || !base64) {
        return json({ error: "filename and base64 are required" }, 400);
      }

      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const mime = contentType || "image/webp";

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${PREFIX}${filename}`, bytes, {
          contentType: mime,
          upsert: true,
        });

      if (error) return json({ error: error.message }, 500);

      const url = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${PREFIX}${filename}`;
      return json({ success: true, filename, url });
    }

    // DELETE — remove image
    if (req.method === "DELETE") {
      const { filename } = await req.json();
      if (!filename) return json({ error: "filename is required" }, 400);

      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([`${PREFIX}${filename}`]);

      if (error) return json({ error: error.message }, 500);
      return json({ success: true, filename });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});
