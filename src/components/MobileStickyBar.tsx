 import { Button } from "@/components/ui/button";
 import { ArrowRight } from "lucide-react";
 import { useBilingualText } from "@/hooks/useBilingualText";
 
 /**
  * Mobile-only sticky CTA bar at bottom of screen.
  * Visible only on screens smaller than md breakpoint.
  */
 const MobileStickyBar = () => {
   const ctaText = useBilingualText(
     "Find Your Perfect Recliner",
     "اكتشف مقعدك المثالي"
   );
 
   const handleClick = () => {
     document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
   };
 
   return (
     <div className="fixed bottom-0 left-0 right-0 md:hidden bg-off-white border-t border-champagne/20 p-4 z-50 shadow-elegant">
       <Button 
         onClick={handleClick}
         className="w-full bg-dandle-orange hover:bg-dandle-orange/90 text-white py-4 text-base font-body group"
       >
         {ctaText}
         <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
       </Button>
     </div>
   );
 };
 
 export default MobileStickyBar;