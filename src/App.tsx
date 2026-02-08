import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { MotionProvider } from "@/components/ui/MotionProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import NourComingSoon from "./pages/NourComingSoon";
import CompleteSet from "./pages/CompleteSet";
import OrderStatus from "./pages/OrderStatus";
import GenerateImages from "./pages/admin/GenerateImages";
import GenerateHeroAssets from "./pages/admin/GenerateHeroAssets";
import GenerateSiteImages from "./pages/admin/GenerateSiteImages";
import ExtractProductImages from "./pages/admin/ExtractProductImages";
import UploadImages from "./pages/admin/UploadImages";
import ImageManager from "./pages/admin/ImageManager";
import AdminLayout from "./components/AdminLayout";
import About from "./pages/trust/About";
import Warranty from "./pages/trust/Warranty";
import Delivery from "./pages/trust/Delivery";
import FAQ from "./pages/trust/FAQ";
import Payment from "./pages/trust/Payment";
import Installation from "./pages/trust/Installation";
import Returns from "./pages/trust/Returns";
import Contact from "./pages/trust/Contact";
import Careers from "./pages/Careers";
import OurStory from "./pages/OurStory";
import Privacy from "./pages/trust/Privacy";
import Terms from "./pages/trust/Terms";
import QaVisual from "./pages/QaVisual";

// Lazy-loaded heavy pages for better performance
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Compare = lazy(() => import("./pages/Compare"));
const GiftPicker = lazy(() => import("./pages/GiftPicker"));
const RoomFit = lazy(() => import("./pages/RoomFit"));
const ChairFinder = lazy(() => import("./pages/ChairFinder"));
const Collection = lazy(() => import("./pages/Collection"));

const queryClient = new QueryClient();

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <MotionProvider>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/nour-chat" element={<NourComingSoon />} />
              <Route path="/complete-set" element={<CompleteSet />} />
              <Route path="/collection" element={<Suspense fallback={<PageLoader />}><Collection /></Suspense>} />
              <Route path="/products/:handle" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
              <Route path="/product/:handle" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
              <Route path="/order/:reference" element={<OrderStatus />} />
              <Route path="/admin/generate-images" element={<AdminLayout><GenerateImages /></AdminLayout>} />
              <Route path="/admin/generate-hero" element={<AdminLayout><GenerateHeroAssets /></AdminLayout>} />
              <Route path="/admin/site-images" element={<AdminLayout><GenerateSiteImages /></AdminLayout>} />
              <Route path="/admin/extract-images" element={<AdminLayout><ExtractProductImages /></AdminLayout>} />
              <Route path="/admin/upload-images" element={<AdminLayout><UploadImages /></AdminLayout>} />
              <Route path="/admin/images" element={<AdminLayout><ImageManager /></AdminLayout>} />
              <Route path="/about" element={<About />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/gift" element={<Suspense fallback={<PageLoader />}><GiftPicker /></Suspense>} />
              <Route path="/room-fit" element={<Suspense fallback={<PageLoader />}><RoomFit /></Suspense>} />
              <Route path="/chair-finder" element={<Suspense fallback={<PageLoader />}><ChairFinder /></Suspense>} />
              <Route path="/compare" element={<Suspense fallback={<PageLoader />}><Compare /></Suspense>} />
              <Route path="/qa" element={<QaVisual />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </CartProvider>
  </MotionProvider>
);

export default App;
