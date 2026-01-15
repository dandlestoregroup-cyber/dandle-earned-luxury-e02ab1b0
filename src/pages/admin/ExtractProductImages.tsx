/**
 * Admin page to extract product images from uploaded ZIP file
 * and update the product image mappings
 */
import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, FileImage, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ExtractedImage {
  name: string;
  path: string;
  blob: Blob;
  productKey?: string;
  swatchKey?: string;
}

// Map filenames to product keys
const productKeyMap: Record<string, string> = {
  'relaxmax': 'relaxmax',
  'diva': 'diva',
  'cozycompanion': 'cozycompanion',
  'comfortplus': 'comfortplus',
  'easyup': 'easyup',
  'easyup-compact': 'easyup-compact',
  'worknest': 'worknest',
  'spacesaver': 'spacesaver',
  'complete-set': 'complete-set',
};

// Parse filename to extract product and swatch info
function parseFilename(filename: string): { productKey?: string; swatchKey?: string } {
  const lower = filename.toLowerCase();
  
  // Find product key
  let productKey: string | undefined;
  for (const [key, value] of Object.entries(productKeyMap)) {
    if (lower.includes(key)) {
      productKey = value;
      break;
    }
  }
  
  // Extract swatch/color info from filename
  let swatchKey: string | undefined;
  const swatchPatterns: Record<string, string> = {
    'mocha': 'mocha-taupe',
    'taupe': 'mocha-taupe',
    'beige': 'alexandria-linen',
    'linen': 'alexandria-linen',
    'offwhite': 'alexandria-linen',
    'off-white': 'alexandria-linen',
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
    'denim': 'blue-nile-denim',
    'red': 'nile-mist',
    'terracotta': 'nile-mist',
    'amber': 'amber-sand',
    'sand': 'amber-sand',
    'tan': 'amber-sand',
  };
  
  for (const [pattern, key] of Object.entries(swatchPatterns)) {
    if (lower.includes(pattern)) {
      swatchKey = key;
      break;
    }
  }
  
  return { productKey, swatchKey };
}

export default function ExtractProductImages() {
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const extractZip = useCallback(async () => {
    setIsExtracting(true);
    try {
      // Fetch the uploaded zip file
      const response = await fetch('/Processed_Products.zip');
      if (!response.ok) {
        throw new Error('ZIP file not found at /Processed_Products.zip');
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      const images: ExtractedImage[] = [];
      
      // Extract all image files
      for (const [path, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        
        // Only process image files
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

  const downloadImage = useCallback((image: ExtractedImage) => {
    const url = URL.createObjectURL(image.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadAllImages = useCallback(async () => {
    if (extractedImages.length === 0) {
      toast.error('No images to download');
      return;
    }

    setIsDownloading(true);
    try {
      // Download each image individually with a small delay
      for (const image of extractedImages) {
        downloadImage(image);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      toast.success(`Downloaded ${extractedImages.length} images`);
    } catch (error) {
      toast.error('Failed to download images');
    } finally {
      setIsDownloading(false);
    }
  }, [extractedImages, downloadImage]);

  const generateMappingCode = useCallback(() => {
    // Group images by product
    const byProduct: Record<string, ExtractedImage[]> = {};
    for (const img of extractedImages) {
      if (img.productKey) {
        if (!byProduct[img.productKey]) {
          byProduct[img.productKey] = [];
        }
        byProduct[img.productKey].push(img);
      }
    }
    
    // Generate TypeScript code
    let code = `// Product color images mapping - generated from Processed_Products.zip\n`;
    code += `// Copy this to src/data/productColorImages.ts\n\n`;
    code += `export const productColorImages: Record<string, ColorVariant[]> = {\n`;
    
    for (const [productKey, images] of Object.entries(byProduct)) {
      code += `  '${productKey}': [\n`;
      for (const img of images) {
        code += `    { swatchKey: '${img.swatchKey || 'unknown'}', imageSrc: '/images/${img.name}' },\n`;
      }
      code += `  ],\n`;
    }
    
    code += `};\n`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(code);
    toast.success('Mapping code copied to clipboard');
  }, [extractedImages]);

  return (
    <div className="min-h-screen bg-obsidian p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-warm-beige/10 border-champagne/20">
          <CardHeader>
            <CardTitle className="text-champagne flex items-center gap-2">
              <FileImage className="w-6 h-6" />
              Extract Product Images from ZIP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={extractZip}
                disabled={isExtracting}
                className="bg-dandle-orange hover:bg-dandle-orange/90"
              >
                {isExtracting ? 'Extracting...' : 'Extract ZIP'}
              </Button>
              
              {extractedImages.length > 0 && (
                <>
                  <Button
                    onClick={downloadAllImages}
                    disabled={isDownloading}
                    variant="outline"
                    className="border-champagne/30 text-champagne"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isDownloading ? 'Downloading...' : `Download All (${extractedImages.length})`}
                  </Button>
                  
                  <Button
                    onClick={generateMappingCode}
                    variant="outline"
                    className="border-champagne/30 text-champagne"
                  >
                    Generate Mapping Code
                  </Button>
                </>
              )}
            </div>
            
            <p className="text-off-white/70 text-sm">
              This tool extracts images from /public/Processed_Products.zip and helps you 
              download them to /public/images/ and generate the mapping code.
            </p>
          </CardContent>
        </Card>

        {extractedImages.length > 0 && (
          <Card className="bg-warm-beige/10 border-champagne/20">
            <CardHeader>
              <CardTitle className="text-champagne">
                Extracted Images ({extractedImages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {extractedImages.map((img, index) => (
                    <div
                      key={index}
                      className="bg-obsidian/50 rounded-lg p-3 border border-champagne/10"
                    >
                      <img
                        src={URL.createObjectURL(img.blob)}
                        alt={img.name}
                        className="w-full aspect-square object-contain rounded mb-2 bg-white/5"
                      />
                      <p className="text-off-white text-xs truncate mb-1" title={img.name}>
                        {img.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs">
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
                      </div>
                      {img.swatchKey && (
                        <span className="text-champagne/70 text-xs">
                          {img.swatchKey}
                        </span>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full mt-2 text-xs"
                        onClick={() => downloadImage(img)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
        
        {/* Instructions */}
        <Card className="bg-warm-beige/10 border-champagne/20">
          <CardHeader>
            <CardTitle className="text-champagne">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-off-white/80 space-y-2">
            <p>1. Click "Extract ZIP" to load and parse the Processed_Products.zip file</p>
            <p>2. Review the extracted images and their detected product/swatch mappings</p>
            <p>3. Click "Download All" to save images locally</p>
            <p>4. Manually copy downloaded images to /public/images/ folder</p>
            <p>5. Click "Generate Mapping Code" to get the productColorImages mapping</p>
            <p>6. Update src/data/productColorImages.ts with the generated code</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
