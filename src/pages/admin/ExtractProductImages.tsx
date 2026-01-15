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
import { Download, FileImage, CheckCircle2, AlertTriangle, Upload, RefreshCw, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ExtractedImage {
  name: string;
  path: string;
  blob?: Blob;
  url?: string;
  productKey?: string;
  swatchKey?: string;
  inStorage?: boolean;
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

export default function ExtractProductImages() {
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [storageImages, setStorageImages] = useState<ExtractedImage[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // Load existing images from storage on mount
  useEffect(() => {
    loadStorageImages();
  }, []);

  const loadStorageImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .list('extracted-products', { limit: 500 });
      
      if (error) {
        console.error('Error loading storage images:', error);
        return;
      }
      
      const images: ExtractedImage[] = (data || [])
        .filter(file => !file.name.startsWith('.'))
        .map(file => {
          const { productKey, swatchKey } = parseFilename(file.name);
          const { data: urlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(`extracted-products/${file.name}`);
          
          return {
            name: file.name,
            path: `extracted-products/${file.name}`,
            url: urlData.publicUrl,
            productKey,
            swatchKey,
            inStorage: true,
          };
        });
      
      setStorageImages(images);
    } catch (err) {
      console.error('Failed to load storage images:', err);
    }
  };

  const extractZip = useCallback(async () => {
    setIsExtracting(true);
    try {
      const response = await fetch('/Processed_Products.zip');
      if (!response.ok) {
        throw new Error('ZIP file not found at /Processed_Products.zip');
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
        
        images.push({
          name,
          path,
          blob,
          productKey,
          swatchKey,
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
  }, []);

  const uploadToStorage = useCallback(async () => {
    setIsUploading(true);

    try {
      // Fetch the ZIP file
      toast.info('Fetching ZIP file...');
      const response = await fetch('/Processed_Products.zip');
      if (!response.ok) throw new Error('ZIP file not found');
      
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      // Convert to base64
      toast.info('Encoding ZIP...');
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.slice(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      const base64 = btoa(binary);
      
      // Send to edge function
      toast.info('Uploading to storage via edge function...');
      const { data, error } = await supabase.functions.invoke('extract-zip-images', {
        body: { zipBase64: base64 }
      });
      
      if (error) {
        throw error;
      }
      
      const successCount = data?.results?.filter((r: { uploaded: boolean }) => r.uploaded).length || 0;
      toast.success(`Uploaded ${successCount} images to storage!`);
      await loadStorageImages();
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }, [extractedImages]);

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
    
    // Get base URL for storage
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'rbvbrxjnhmgrtxvwusxr';
    const baseUrl = `https://${projectId}.supabase.co/storage/v1/object/public/product-images/extracted-products`;
    
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
        
        const imagePath = `${baseUrl}/${encodeURIComponent(img.name)}`;
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
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={extractZip}
                disabled={isExtracting}
                className="bg-dandle-orange hover:bg-dandle-orange/90"
              >
                {isExtracting ? 'Extracting...' : '1. Extract ZIP'}
              </Button>
              
              <Button
                onClick={uploadToStorage}
                disabled={isUploading || extractedImages.length === 0}
                className="bg-green-600 hover:bg-green-700"
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
              <p><strong>Step 1:</strong> Extract images from /public/Processed_Products.zip</p>
              <p><strong>Step 2:</strong> Upload all images to Supabase Storage (product-images/extracted-products/)</p>
              <p><strong>Step 3:</strong> Generate the productColorImages.ts mapping code</p>
              <p><strong>Step 4:</strong> Paste the code into src/data/productColorImages.ts</p>
            </div>
            
            {storageImages.length > 0 && (
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 text-sm">
                  ✓ {storageImages.length} images already in storage - ready to use!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {displayImages.length > 0 && (
          <Card className="bg-warm-beige/10 border-champagne/20">
            <CardHeader>
              <CardTitle className="text-champagne">
                {storageImages.length > 0 ? 'Images in Storage' : 'Extracted Images'} ({displayImages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {displayImages.map((img, index) => (
                    <div
                      key={index}
                      className="bg-obsidian/50 rounded-lg p-3 border border-champagne/10"
                    >
                      <img
                        src={img.url || (img.blob ? URL.createObjectURL(img.blob) : '')}
                        alt={img.name}
                        className="w-full aspect-square object-contain rounded mb-2 bg-white/5"
                      />
                      <p className="text-off-white text-xs truncate mb-1" title={img.name}>
                        {img.name}
                      </p>
                      <div className="flex flex-col gap-1 text-xs">
                        {img.productKey ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle2 className="w-3 h-3" />
                            {img.productKey}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <AlertTriangle className="w-3 h-3" />
                            Unknown product
                          </span>
                        )}
                        {img.swatchKey && (
                          <span className="text-champagne/70">
                            → {img.swatchKey}
                          </span>
                        )}
                        {img.inStorage && (
                          <span className="text-blue-400">
                            ✓ In Storage
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
        
        {generatedCode && (
          <Card className="bg-warm-beige/10 border-champagne/20">
            <CardHeader>
              <CardTitle className="text-champagne">Generated Code (copied to clipboard)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-obsidian p-4 rounded-lg overflow-x-auto text-xs text-green-400 max-h-96">
                {generatedCode}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
