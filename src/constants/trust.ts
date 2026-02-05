 /* Centralized trust claims - used site-wide */
 
 export const TRUST_CLAIMS = {
   deliveryDays: 14,
   warrantyYears: 2,
   frameWarrantyYears: 5,
   installationCost: 0, // Free
 } as const;
 
 export const getTrustText = (lang: 'en' | 'ar') => ({
   delivery: lang === 'ar' 
     ? `توصيل خلال ${TRUST_CLAIMS.deliveryDays} يوم` 
     : `${TRUST_CLAIMS.deliveryDays}-Day Delivery`,
   warranty: lang === 'ar' 
     ? `ضمان ${TRUST_CLAIMS.warrantyYears} سنتين` 
     : `${TRUST_CLAIMS.warrantyYears}-Year Warranty`,
   installation: lang === 'ar'
     ? 'تركيب مجاني'
     : 'Free Installation',
 });