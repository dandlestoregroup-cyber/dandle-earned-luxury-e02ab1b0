import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Search, Upload, Trash2, Copy, Replace, Eye, RefreshCw, X } from "lucide-react";

const BUCKET = "product-images";
const PREFIX = "images/";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface StorageFile {
  name: string;
  size: number | null;
  url: string;
}

export default function ImageManager() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<StorageFile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StorageFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list("images", { limit: 1000, sortBy: { column: "name", order: "asc" } });

    if (!error && data) {
      setFiles(
        data
          .filter((f) => f.name && !f.name.startsWith("."))
          .map((f) => ({
            name: f.name,
            size: (f.metadata as any)?.size ?? null,
            url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${PREFIX}${f.name}`,
          }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const filtered = search
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied" });
  };

  const handleUpload = async (inputFiles: FileList | null) => {
    if (!inputFiles?.length) return;
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(inputFiles)) {
      const path = replaceTarget ? `${PREFIX}${replaceTarget}` : `${PREFIX}${file.name}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: true });
      if (!error) ok++;
    }
    setReplaceTarget(null);
    setUploading(false);
    toast({ title: `${ok} image${ok !== 1 ? "s" : ""} uploaded` });
    fetchFiles();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([`${PREFIX}${deleteTarget.name}`]);
    setDeleting(false);
    setDeleteTarget(null);
    if (!error) {
      toast({ title: "Deleted" });
      fetchFiles();
    } else {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const triggerReplace = (name: string) => {
    setReplaceTarget(name);
    replaceInputRef.current?.click();
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cloud Image Manager</h1>
          <p className="text-sm text-muted-foreground">{files.length} images in storage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchFiles} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
          <Button size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4 mr-1" /> Upload
          </Button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden"
        onChange={(e) => handleUpload(e.target.files)} />
      <input ref={replaceInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Filter by filename…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="pl-9" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((f) => (
            <div key={f.name} className="group relative rounded-lg border overflow-hidden bg-muted/30">
              <div className="aspect-square">
                <img src={f.url} alt={f.name} loading="lazy"
                  className="w-full h-full object-cover" />
              </div>
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setPreview(f)}><Eye className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => copyUrl(f.url)}><Copy className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => triggerReplace(f.name)}><Replace className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-white/20"
                    onClick={() => setDeleteTarget(f)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              {/* Label */}
              <div className="px-2 py-1.5 border-t">
                <p className="text-xs truncate text-foreground">{f.name}</p>
                <p className="text-[10px] text-muted-foreground">{formatSize(f.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No images found.</p>
      )}

      {/* Lightbox */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
            <DialogDescription>Full-size preview</DialogDescription>
          </DialogHeader>
          {preview && (
            <img src={preview.url} alt={preview.name} className="w-full rounded" />
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => preview && copyUrl(preview.url)}>
              <Copy className="w-4 h-4 mr-1" /> Copy URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete image?</DialogTitle>
            <DialogDescription>
              This will permanently remove <strong>{deleteTarget?.name}</strong> from cloud storage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
