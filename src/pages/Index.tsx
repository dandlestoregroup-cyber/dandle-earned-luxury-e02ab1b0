import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Partners from "@/components/Partners";
import CollectionIntro from "@/components/CollectionIntro";
import ProductGallery from "@/components/ProductGallery";
import TrustBlock from "@/components/TrustBlock";
import IstikbalShowroom from "@/components/IstikbalShowroom";
import GiftOfComfort from "@/components/GiftOfComfort";
import AmazonVerification from "@/components/AmazonVerification";
import WishlistModal from "@/components/WishlistModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/utils/structuredData";
import MobileStickyBar from "@/components/MobileStickyBar";
import ThunderButton from "@/components/ThunderButton";
import { useLang } from "@/hooks/useBilingualText";

const Index = () => {
  const { isArabic } = useLang();
  
  const pageTitle = isArabic 
    ? "Dandle ريكلاينرز مصر - كراسي راحة فاخرة | توصيل مجاني"
    : "Dandle Recliners Egypt - Premium Comfort Chairs | Free Delivery";
    
  const pageDescription = isArabic
    ? "Dandle ريكلاينرز - كراسي استرخاء فاخرة صناعة مصرية. تصميم راقي، راحة استثنائية، ضمان سنتين. توصيل مجاني في القاهرة والإسكندرية."
    : "Dandle Recliners - Premium Egyptian-made comfort chairs. Elegant design, exceptional comfort, 2-year warranty. Free delivery in Cairo and Alexandria.";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={isArabic ? "ar" : "en"} dir={isArabic ? "rtl" : "ltr"} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <Quote />
        <CollectionIntro />
        <ProductGallery />
        <GiftOfComfort />
        <TrustBlock />
        <IstikbalShowroom />
        <AmazonVerification variant="home" />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <WishlistModal />
      <CartDrawer />
      <MobileStickyBar />
      <ThunderButton />
    </div>
  );
};

export default Index;
