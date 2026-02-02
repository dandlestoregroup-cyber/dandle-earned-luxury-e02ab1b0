/**
 * Admin page to extract product images from uploaded ZIP file
 * Uploads to Supabase Storage and generates product mappings
 */
import { useState, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, FileImage, CheckCircle2, AlertTriangle, Upload, RefreshCw, Copy, FolderOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExtractedImage {
  name: string;
  path: string;
  blob?: Blob;
  url?: string;
  productKey?: string;
  swatchKey?: string;
  inStorage?: boolean;
  folder?: string;
}

interface ZipContents {
  folders: string[];
  files: { path: string; name: string }[];
}

// Map filenames to product keys
const productKeyMap: Record<string, string> = {
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

// Parse filename to extract product and swatch info
function parseFilename(filename: string): { productKey?: string; swatchKey?: string } {
  const lower = filename.toLowerCase();
  
  // Find product key - check longer keys first
  let productKey: string | undefined;
  const sortedKeys = Object.keys(productKeyMap).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lower.includes(key)) {
      productKey = productKeyMap[key];
      break;
    }
  }
  
  // Extract swatch/color info from filename
  let swatchKey: string | undefined;
  const swatchPatterns: Record<string, string> = {
    'mocha-taupe': 'mocha-taupe',
    'mocha': 'mocha-taupe',
    'taupe': 'mocha-taupe',
    'alexandria-linen': 'alexandria-linen',
    'beige': 'alexandria-linen',
    'linen': 'alexandria-linen',
    'offwhite': 'alexandria-linen',
    'off-white': 'alexandria-linen',
    'cream': 'alexandria-linen',
    'desert-grey': 'desert-grey',
    'grey': 'desert-grey',
    'gray': 'desert-grey',
    'charcoal': 'desert-grey',
    'coastal-fog': 'coastal-fog',
    'coastal': 'coastal-fog',
    'fog': 'coastal-fog',
    'giza-gold': 'giza-gold',
    'gold': 'giza-gold',
    'yellow': 'giza-gold',
    'oasis-green': 'oasis-green',
    'green': 'oasis-green',
    'oasis': 'oasis-green',
    'desert-sage': 'desert-sage',
    'sage': 'desert-sage',
    'nile-sapphire': 'nile-sapphire',
    'blue': 'nile-sapphire',
    'sapphire': 'nile-sapphire',
    'navy': 'nile-sapphire',
    'blue-nile-denim': 'blue-nile-denim',
    'denim': 'blue-nile-denim',
    'nile-mist': 'nile-mist',
    'red': 'nile-mist',
    'terracotta': 'nile-mist',
    'burgundy': 'nile-mist',
    'amber-sand': 'amber-sand',
    'amber': 'amber-sand',
    'sand': 'amber-sand',
    'tan': 'amber-sand',
    'brown': 'mocha-taupe',
    'espresso': 'mocha-taupe',
  };
  
  // Check longer patterns first
  const sortedPatterns = Object.keys(swatchPatterns).sort((a, b) => b.length - a.length);
  for (const pattern of sortedPatterns) {
    if (lower.includes(pattern)) {
      swatchKey = swatchPatterns[pattern];
      break;
    }
  }
  
  return { productKey, swatchKey };
}

const ZIP_OPTIONS = [
  { name: 'Processed Products (Old)', path: '/Processed_Products.zip' },
  { name: 'Web Images Pack (New)', path: '/dandle_web_images_pack.zip' },
];

export default function ExtractProductImages() {
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [storageImages, setStorageImages] = useState<ExtractedImage[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState(ZIP_OPTIONS[1].path); // Default to new pack
  const [zipContents, setZipContents] = useState<ZipContents | null>(null);
  const [isLoadingContents, setIsLoadingContents] = useState(false);

  // Load existing images from storage on mount
  useEffect(() => {
    loadStorageImages();
  }, []);

  const loadStorageImages = async () => {
    try {
      // List all product subdirectories
      const productFolders = ['relaxmax', 'diva', 'cozycompanion', 'comfortplus', 'easyup', 'easyup-compact', 'worknest', 'spacesaver', 'complete-set', 'extracted-products', 'swatches'];
      const allImages: ExtractedImage[] = [];
      
      for (const folder of productFolders) {
        const { data, error } = await supabase.storage
          .from('product-images')
          .list(folder, { limit: 100 });
        
        if (error) {
          console.log(`No images in ${folder}:`, error.message);
          continue;
        }
        
        const images = (data || [])
          .filter(file => !file.name.startsWith('.') && file.name.includes('.'))
          .map(file => {
            const { productKey, swatchKey } = parseFilename(file.name);
            const storagePath = `${folder}/${file.name}`;
            const { data: urlData } = supabase.storage
              .from('product-images')
              .getPublicUrl(storagePath);
            
            return {
              name: file.name,
              path: storagePath,
              url: urlData.publicUrl,
              productKey: folder === 'extracted-products' ? productKey : folder,
              swatchKey,
              inStorage: true,
              folder,
            };
          });
        
        allImages.push(...images);
      }
      
      setStorageImages(allImages);
    } catch (err) {
      console.error('Failed to load storage images:', err);
    }
  };

  // Load zip contents to show structure
  const loadZipContents = useCallback(async (zipPath: string) => {
    setIsLoadingContents(true);
    try {
      const response = await fetch(zipPath);
      if (!response.ok) {
        throw new Error(`ZIP not found at ${zipPath}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      const folders = new Set<string>();
      const files: { path: string; name: string }[] = [];
      
      for (const [path, file] of Object.entries(zip.files)) {
        if (file.dir) {
          folders.add(path);
        } else {
          const name = path.split('/').pop() || path;
          files.push({ path, name });
          // Also add parent folder
          const parts = path.split('/');
          if (parts.length > 1) {
            folders.add(parts.slice(0, -1).join('/') + '/');
          }
        }
      }
      
      setZipContents({
        folders: Array.from(folders).sort(),
        files: files.sort((a, b) => a.path.localeCompare(b.path)),
      });
      
      toast.success(`Found ${folders.size} folders and ${files.length} files`);
    } catch (error) {
      console.error('Failed to load zip contents:', error);
      toast.error(`Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingContents(false);
    }
  }, []);

  const extractZip = useCallback(async () => {
    setIsExtracting(true);
    try {
      const response = await fetch(selectedZip);
      if (!response.ok) {
        throw new Error(`ZIP file not found at ${selectedZip}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      const images: ExtractedImage[] = [];
      
      for (const [path, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        
        const ext = path.split('.').pop()?.toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) continue;
        
        const blob = await file.async('blob');
        const name = path.split('/').pop() || path;
        const { productKey, swatchKey } = parseFilename(name);
        
        // Extract folder from path
        const parts = path.split('/');
        const folder = parts.length > 1 ? parts[parts.length - 2] : 'root';
        
        images.push({
          name,
          path,
          blob,
          productKey,
          swatchKey,
          folder,
        });
      }
      
      setExtractedImages(images);
      toast.success(`Extracted ${images.length} images from ZIP`);
    } catch (error) {
      console.error('Extraction error:', error);
      toast.error(`Failed to extract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExtracting(false);
    }
  }, [selectedZip]);

  const uploadToStorage = useCallback(async () => {
    setIsUploading(true);

    try {
      // Fetch the selected ZIP file
      toast.info('Fetching ZIP file...');
      const response = await fetch(selectedZip);
      if (!response.ok) throw new Error('ZIP file not found');
      
      const arrayBuffer = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      let uploadCount = 0;
      let errorCount = 0;
      
      for (const [path, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        
        const ext = path.split('.').pop()?.toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) continue;
        
        const data = await file.async('uint8array');
        const name = path.split('/').pop() || path;
        const { productKey } = parseFilename(name);
        
        // Determine upload folder based on path structure
        const parts = path.split('/');
        let uploadFolder = productKey || 'extracted-products';
        
        // Check if it's in a swatches folder
        if (path.toLowerCase().includes('swatch')) {
          uploadFolder = 'swatches';
        }
        
        const contentType = ext === 'png' ? 'image/png' 
          : ext === 'webp' ? 'image/webp'
          : ext === 'gif' ? 'image/gif'
          : 'image/jpeg';
        
        const uploadPath = `${uploadFolder}/${name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(uploadPath, data, {
            contentType,
            upsert: true,
          });
        
        if (uploadError) {
          console.error(`Failed to upload ${name}:`, uploadError);
          errorCount++;
        } else {
          uploadCount++;
        }
      }
      
      toast.success(`Uploaded ${uploadCount} images! ${errorCount > 0 ? `(${errorCount} errors)` : ''}`);
      await loadStorageImages();
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }, [selectedZip]);

  const generateMappingCode = useCallback(() => {
    const allImages = storageImages.length > 0 ? storageImages : extractedImages;
    
    // Group images by product
    const byProduct: Record<string, ExtractedImage[]> = {};
    for (const img of allImages) {
      if (img.productKey) {
        if (!byProduct[img.productKey]) {
          byProduct[img.productKey] = [];
        }
        byProduct[img.productKey].push(img);
      }
    }
    
    // Get base URL for storage - use product subdirectories
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'rbvbrxjnhmgrtxvwusxr';
    const baseUrl = `https://${projectId}.supabase.co/storage/v1/object/public/product-images`;
    
    // Generate TypeScript code
    let code = `/**
 * Maps each product to available color variants with actual product images
 * Generated from Processed_Products.zip - ${new Date().toISOString()}
 */

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

export const productColorImages: Record<string, ColorVariant[]> = {\n`;
    
    const productOrder = ['relaxmax', 'diva', 'cozycompanion', 'comfortplus', 'easyup', 'easyup-compact', 'worknest', 'spacesaver', 'complete-set'];
    
    for (const productKey of productOrder) {
      const images = byProduct[productKey];
      if (!images || images.length === 0) continue;
      
      code += `  '${productKey}': [\n`;
      
      // Dedupe by swatch key
      const seenSwatches = new Set<string>();
      for (const img of images) {
        const swatchKey = img.swatchKey || 'unknown';
        if (seenSwatches.has(swatchKey)) continue;
        seenSwatches.add(swatchKey);
        
        // Use product subdirectory path
        const imagePath = `${baseUrl}/${productKey}/${encodeURIComponent(img.name)}`;
        code += `    { swatchKey: '${swatchKey}', imageSrc: '${imagePath}' },\n`;
      }
      code += `  ],\n`;
    }
    
    code += `};

// Helper to get image for a product + color combination
export function getProductColorImage(productId: string, swatchKey: string): string | null {
  const variants = productColorImages[productId];
  if (!variants) return null;
  const variant = variants.find(v => v.swatchKey === swatchKey);
  return variant?.imageSrc || null;
}

// Helper to get available swatch keys for a product
export function getProductSwatchKeys(productId: string): string[] {
  const variants = productColorImages[productId];
  return variants?.map(v => v.swatchKey) || [];
}
`;
    
    setGeneratedCode(code);
    navigator.clipboard.writeText(code);
    toast.success('Mapping code copied to clipboard!');
  }, [storageImages, extractedImages]);

  const displayImages = storageImages.length > 0 ? storageImages : extractedImages;

  return (
    <div className="min-h-screen bg-obsidian p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="bg-warm-beige/10 border-champagne/20">
          <CardHeader>
            <CardTitle className="text-champagne flex items-center gap-2">
              <FileImage className="w-6 h-6" />
              Product Image Extraction & Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* ZIP Selector */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-obsidian/50 rounded-lg border border-champagne/10">
              <span className="text-off-white text-sm font-medium">Select ZIP:</span>
              {ZIP_OPTIONS.map((opt) => (
                <Button
                  key={opt.path}
                  variant={selectedZip === opt.path ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedZip(opt.path)}
                  className={selectedZip === opt.path 
                    ? 'bg-dandle-orange hover:bg-dandle-orange/90' 
                    : 'border-champagne/30 text-champagne hover:bg-champagne/10'}
                >
                  {opt.name}
                </Button>
              ))}
              <Button
                onClick={() => loadZipContents(selectedZip)}
                disabled={isLoadingContents}
                variant="ghost"
                size="sm"
                className="text-champagne/70"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                {isLoadingContents ? 'Loading...' : 'Show Contents'}
              </Button>
            </div>

            {/* ZIP Contents Preview */}
            {zipContents && (
              <div className="bg-obsidian/50 rounded-lg border border-champagne/10 p-4">
                <h3 className="text-champagne font-medium mb-3">
                  ZIP Structure ({zipContents.folders.length} folders, {zipContents.files.length} files)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-off-white/70 text-sm mb-2">Folders:</h4>
                    <ScrollArea className="h-40 bg-obsidian rounded p-2">
                      {zipContents.folders.map((folder, i) => (
                        <div key={i} className="text-champagne/80 text-xs font-mono">
                          📁 {folder}
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <div>
                    <h4 className="text-off-white/70 text-sm mb-2">Sample Files:</h4>
                    <ScrollArea className="h-40 bg-obsidian rounded p-2">
                      {zipContents.files.slice(0, 50).map((file, i) => (
                        <div key={i} className="text-off-white/60 text-xs font-mono truncate" title={file.path}>
                          📄 {file.path}
                        </div>
                      ))}
                      {zipContents.files.length > 50 && (
                        <div className="text-champagne/50 text-xs mt-2">
                          ... and {zipContents.files.length - 50} more files
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={extractZip}
                disabled={isExtracting}
                className="bg-dandle-orange hover:bg-dandle-orange/90"
              >
                {isExtracting ? 'Extracting...' : '1. Extract & Preview'}
              </Button>
              
              <Button
                onClick={uploadToStorage}
                disabled={isUploading || extractedImages.length === 0}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : `2. Upload to Storage (${extractedImages.length})`}
              </Button>
              
              <Button
                onClick={generateMappingCode}
                disabled={displayImages.length === 0}
                variant="outline"
                className="border-champagne/30 text-champagne"
              >
                <Copy className="w-4 h-4 mr-2" />
                3. Generate & Copy Code
              </Button>
              
              <Button
                onClick={loadStorageImages}
                variant="ghost"
                className="text-champagne/70"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Storage
              </Button>
            </div>
            
            <div className="text-off-white/70 text-sm space-y-1">
              <p><strong>Step 1:</strong> Select a ZIP and click "Extract & Preview" to see images</p>
              <p><strong>Step 2:</strong> Upload all images to Supabase Storage</p>
              <p><strong>Step 3:</strong> Generate the productColorImages.ts mapping code</p>
              <p><strong>Step 4:</strong> Paste the code into src/data/productColorImages.ts</p>
            </div>
            
            {storageImages.length > 0 && (
              <div className="bg-accent/20 border border-accent/30 rounded-lg p-3">
                <p className="text-accent text-sm">
                  ✓ {storageImages.length} images already in storage - ready to use!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Grid with Tabs for different views */}
        <Tabs defaultValue="extracted" className="w-full">
          <TabsList className="bg-obsidian/50 border border-champagne/20">
            <TabsTrigger value="extracted" className="data-[state=active]:bg-dandle-orange">
              Extracted ({extractedImages.length})
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-dandle-orange">
              In Storage ({storageImages.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="extracted">
            {extractedImages.length > 0 ? (
              <Card className="bg-warm-beige/10 border-champagne/20">
                <CardHeader>
                  <CardTitle className="text-champagne">
                    Extracted Images ({extractedImages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {extractedImages.map((img, index) => (
                        <div
                          key={index}
                          className="bg-obsidian/50 rounded-lg p-3 border border-champagne/10"
                        >
                          <img
                            src={img.blob ? URL.createObjectURL(img.blob) : ''}
                            alt={img.name}
                            className="w-full aspect-square object-contain rounded mb-2 bg-white/5"
                          />
                          <p className="text-off-white text-xs truncate mb-1" title={img.name}>
                            {img.name}
                          </p>
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="text-champagne/50 truncate" title={img.folder}>
                              📁 {img.folder}
                            </span>
                            {img.productKey ? (
                              <span className="flex items-center gap-1 text-accent">
                                <CheckCircle2 className="w-3 h-3" />
                                {img.productKey}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <AlertTriangle className="w-3 h-3" />
                                Unknown
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-warm-beige/10 border-champagne/20">
                <CardContent className="py-12 text-center text-off-white/50">
                  Click "Extract & Preview" to load images from the selected ZIP
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="storage">
            {storageImages.length > 0 ? (
              <Card className="bg-warm-beige/10 border-champagne/20">
                <CardHeader>
                  <CardTitle className="text-champagne">
                    Images in Storage ({storageImages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {storageImages.map((img, index) => (
                        <div
                          key={index}
                          className="bg-obsidian/50 rounded-lg p-3 border border-champagne/10"
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full aspect-square object-contain rounded mb-2 bg-white/5"
                          />
                          <p className="text-off-white text-xs truncate mb-1" title={img.name}>
                            {img.name}
                          </p>
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="text-champagne/50 truncate">
                              📁 {img.folder}
                            </span>
                            <span className="text-accent">
                              ✓ In Storage
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-warm-beige/10 border-champagne/20">
                <CardContent className="py-12 text-center text-off-white/50">
                  No images in storage yet. Upload some images first.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        {generatedCode && (
          <Card className="bg-warm-beige/10 border-champagne/20">
            <CardHeader>
              <CardTitle className="text-champagne">Generated Code (copied to clipboard)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-obsidian p-4 rounded-lg overflow-x-auto text-xs text-accent max-h-96">
                {generatedCode}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
