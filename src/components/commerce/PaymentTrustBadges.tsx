 import { cn } from '@/lib/utils';
 
 interface PaymentTrustBadgesProps {
   className?: string;
   compact?: boolean;
 }
 
 /**
  * Payment Trust Badges Component
  * Displays ValU, Paymob, and Visa logos to build checkout trust
  */
 export function PaymentTrustBadges({ className, compact = false }: PaymentTrustBadgesProps) {
   return (
     <div className={cn(
       'flex items-center justify-center gap-4 py-3',
       compact ? 'gap-3 py-2' : 'gap-6 py-4',
       className
     )}>
       {/* ValU Logo - Text placeholder styled as badge */}
       <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#1a1a6c] to-[#2e2e9c] rounded-md">
         <span className="text-white text-xs font-bold tracking-wide">valU</span>
       </div>
       
       {/* Paymob Logo - Text placeholder styled as badge */}
       <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#00b4d8] to-[#0096c7] rounded-md">
         <span className="text-white text-xs font-bold tracking-wide">Paymob</span>
       </div>
       
       {/* Visa Logo - Text placeholder styled as badge */}
       <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#1a1f71] to-[#2d3388] rounded-md">
         <span className="text-white text-xs font-bold tracking-wide italic">VISA</span>
       </div>
     </div>
   );
 }
 
 export default PaymentTrustBadges;