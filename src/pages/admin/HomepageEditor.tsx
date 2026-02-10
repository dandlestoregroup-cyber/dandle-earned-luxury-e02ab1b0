import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import CollectionIntro from "@/components/CollectionIntro";
import ProductGallery from "@/components/ProductGallery";
import GiftOfComfort from "@/components/GiftOfComfort";
import AmazonVerification from "@/components/AmazonVerification";
import TrustBlock from "@/components/TrustBlock";
import IstikbalShowroom from "@/components/IstikbalShowroom";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import ImageEditOverlay from "@/components/admin/ImageEditOverlay";
import { useImageEditor } from "@/hooks/useImageEditor";
import { Button } from "@/components/ui/button";
import { Trash2, Image } from "lucide-react";

const HomepageEditor = () => {
  const { getPendingCount, discardAll } = useImageEditor();
  const pendingCount = getPendingCount();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Homepage Editor — Admin</title>
      </Helmet>

      {/* Admin Toolbar */}
      <div className="sticky top-0 z-[9998] bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-primary" />
            <h1 className="text-sm font-semibold text-foreground">Homepage Image Editor</h1>
            <span className="text-xs text-muted-foreground">Click any image to edit</span>
          </div>
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <>
                <span className="text-xs font-medium text-primary">
                  {pendingCount} pending edit{pendingCount > 1 ? "s" : ""}
                </span>
                <Button variant="outline" size="sm" onClick={discardAll}>
                  <Trash2 className="w-3 h-3 mr-1" /> Discard All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mirrored Homepage with pointer-events disabled on non-editor interactive elements */}
      <ImageEditOverlay>
        <div
          className="[&_.whatsapp-float]:pointer-events-none [&_.thunder-dock]:pointer-events-none [&_.mobile-sticky-bar]:pointer-events-none [&_.exit-intent]:pointer-events-none [&_.cart-drawer]:pointer-events-none"
        >
          <Navigation />
          <TrustBar />
          <main>
            <Hero />
            <Quote />
            <CollectionIntro />
            <ProductGallery />
            <GiftOfComfort />
            <AmazonVerification />
            <TrustBlock />
            <IstikbalShowroom />
            <Partners />
            <Contact />
          </main>
          <Footer />
        </div>
      </ImageEditOverlay>
    </div>
  );
};

export default HomepageEditor;
