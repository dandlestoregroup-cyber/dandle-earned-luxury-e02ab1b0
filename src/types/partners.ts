/**
 * Partner Architecture Data Models
 * 
 * Clear separation between:
 * - Production (Suppliers) → Where furniture is made
 * - Experience (Showrooms) → Where customers decide
 * - Fulfillment (Warehouse) → Where inventory is managed
 */

// ============================================
// PRODUCTION LAYER (Dandle-owned)
// ============================================

export interface Supplier {
  id: string;
  name: string;
  type: 'workshop' | 'craftsman' | 'materials';
  capabilities: string[];
  leadTimeDays: number;
  location: string;
  isActive: boolean;
}

export interface ProductionCapacity {
  supplierId: string;
  productType: string;
  unitsPerMonth: number;
  currentQueue: number;
}

export interface MaterialSupplier {
  id: string;
  name: string;
  materialType: 'fabric' | 'leather' | 'mechanism' | 'frame' | 'foam';
  leadTimeDays: number;
  minimumOrderQuantity: number;
}

// ============================================
// EXPERIENCE LAYER (Partner-owned)
// ============================================

export interface ShowroomPartner {
  id: string;
  brandName: string;
  partnerCode: string;
  role: 'showroom'; // Never 'supplier' or 'warehouse'
  locations: ShowroomLocation[];
  capabilities: ShowroomCapability[];
  commissionRate?: number; // Percentage on referred sales
}

export interface ShowroomLocation {
  id: string;
  partnerId: string;
  name: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  city: string;
  phone?: string;
  whatsapp?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  operatingHours?: string;
  hasDisplayUnits: boolean;
}

export type ShowroomCapability = 
  | 'appointment_booking'
  | 'assisted_sales'
  | 'demo_units'
  | 'fabric_samples'
  | 'delivery_coordination';

export interface ShowroomVisit {
  id: string;
  locationId: string;
  customerPhone?: string;
  customerEmail?: string;
  visitDate: Date;
  appointmentTime?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  resultedInOrder?: boolean;
  orderId?: string;
}

export interface DemoUnit {
  id: string;
  locationId: string;
  productId: string;
  productName: string;
  fabricSwatch: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_replacement';
  isSellable: false; // Demo units are NEVER sellable inventory
  installedDate: Date;
}

// ============================================
// FULFILLMENT LAYER (Dandle-owned)
// ============================================

export interface InventoryItem {
  id: string;
  productId: string;
  sku: string;
  fabricSwatch: string;
  status: 'in_stock' | 'reserved' | 'in_production' | 'sold';
  warehouseLocation: string;
  producedDate?: Date;
  reservedForOrderId?: string;
}

export interface OrderAttribution {
  orderId: string;
  source: 'direct' | 'showroom' | 'referral';
  partnerCode?: string;
  partnerId?: string;
  showroomLocationId?: string;
  visitId?: string;
  attributedAt: Date;
}

export interface FulfillmentRecord {
  orderId: string;
  status: 'pending' | 'confirmed' | 'in_production' | 'ready' | 'scheduled' | 'delivered';
  inventoryItemId?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  installedBy: 'dandle_team'; // Always Dandle, never partner
  deliveryAddress: string;
  customerPhone: string;
}

// ============================================
// ATTRIBUTION & ANALYTICS
// ============================================

export interface PartnerPerformance {
  partnerId: string;
  period: string; // e.g., '2024-01'
  totalVisits: number;
  totalOrders: number;
  conversionRate: number;
  totalRevenue: number;
  commissionEarned: number;
}

export interface CustomerJourney {
  customerId?: string;
  customerPhone: string;
  touchpoints: JourneyTouchpoint[];
  finalOrderId?: string;
  totalTimeToConversion?: number; // days
}

export interface JourneyTouchpoint {
  type: 'website_visit' | 'showroom_visit' | 'whatsapp_inquiry' | 'order_placed';
  timestamp: Date;
  partnerId?: string;
  locationId?: string;
  notes?: string;
}

// ============================================
// PARTNER CODE SYSTEM
// ============================================

export interface PartnerCodeValidation {
  code: string;
  isValid: boolean;
  partnerId?: string;
  partnerName?: string;
  locationId?: string;
  locationName?: string;
}

/**
 * Partner code format: PARTNER-LOCATION
 * Example: IST-DOKKI, IST-CITYSTARS
 * 
 * Used for:
 * - Order attribution
 * - Commission tracking
 * - Warranty registration
 * - Analytics
 */
export const validatePartnerCode = (code: string): boolean => {
  if (!code || code.length < 3) return false;
  // Partner codes are alphanumeric with optional hyphen
  return /^[A-Z0-9]+-?[A-Z0-9]*$/i.test(code.toUpperCase());
};
