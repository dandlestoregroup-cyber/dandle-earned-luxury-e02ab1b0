import { Helmet } from "react-helmet";
import TopBanner from "@/components/TopBanner";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OfflineNotice from "@/components/OfflineNotice";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import CollectionIntro from "@/components/CollectionIntro";
import ProductGallery from "@/components/ProductGallery";
import TrustBlock from "@/components/TrustBlock";
import IstikbalShowroom from "@/components/IstikbalShowroom";
import GiftOfComfort from "@/components/GiftOfComfort";
import WishlistModal from "@/components/WishlistModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/utils/structuredData";
import ThunderDock from "@/components/ThunderDock";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileStickyBar from "@/components/MobileStickyBar";
import ExitIntentCapture from "@/components/ExitIntentCapture";
import AmazonVerification from "@/components/AmazonVerification";
import { useLang } from "@/hooks/useBilingualText";
import TrustBar from "@/components/TrustBar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PWAInstallBanner from "@/components/PWAInstallBanner";


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
      <TopBanner />
      <ScrollProgress />
      <OfflineNotice />
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
      <WishlistModal />
      <CartDrawer />
      <ThunderDock />
      <WhatsAppFloat />
      <MobileStickyBar />
      <ExitIntentCapture />
      <BackToTop />
      <PWAInstallBanner />
    </div>
  );
};

export default Index;
