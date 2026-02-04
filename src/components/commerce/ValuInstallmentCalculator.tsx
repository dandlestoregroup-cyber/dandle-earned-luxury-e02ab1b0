import { useMemo } from 'react';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValuInstallmentCalculatorProps {
  price: number;
  className?: string;
  showBadge?: boolean;
  compact?: boolean;
}

// ValU financing constants for Egypt
const VALU_CONFIG = {
  minAmount: 500, // Minimum EGP for installments
  maxMonths: 60,
  interestRate: 0, // 0% interest campaigns (common for furniture)
  adminFee: 0.02, // 2% admin fee typical
  plans: [6, 12, 18, 24, 36, 48, 60] as const,
};

interface InstallmentPlan {
  months: number;
  monthlyPayment: number;
  totalAmount: number;
}

/**
 * Calculate ValU installment plans for a given price
 * Based on typical Egyptian furniture financing terms
 */
export function calculateValuInstallments(price: number): InstallmentPlan[] {
  if (price < VALU_CONFIG.minAmount) return [];
  
  return VALU_CONFIG.plans
    .filter(months => {
      // Minimum EGP 200/month for practicality
      const monthly = price / months;
      return monthly >= 200;
    })
    .map(months => {
      // Apply admin fee to total, then divide
      const totalWithFee = price * (1 + VALU_CONFIG.adminFee);
      const monthlyPayment = Math.ceil(totalWithFee / months);
      
      return {
        months,
        monthlyPayment,
        totalAmount: monthlyPayment * months,
      };
    });
}

/**
 * Get the most attractive installment option (lowest monthly payment with reasonable term)
 */
export function getBestInstallmentPlan(price: number): InstallmentPlan | null {
  const plans = calculateValuInstallments(price);
  
  // Prefer 12-24 month plans as best balance
  const preferred = plans.find(p => p.months === 12 || p.months === 18 || p.months === 24);
  if (preferred) return preferred;
  
  // Fallback to longest available for lowest monthly
  return plans[plans.length - 1] || null;
}

/**
 * Format currency for Egyptian pounds
 */
function formatEGP(amount: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * ValU Installment Calculator Component
 * Displays financing options dynamically based on product price
 */
export function ValuInstallmentCalculator({
  price,
  className,
  showBadge = true,
  compact = false,
}: ValuInstallmentCalculatorProps) {
  const bestPlan = useMemo(() => getBestInstallmentPlan(price), [price]);
  const allPlans = useMemo(() => calculateValuInstallments(price), [price]);
  
  if (!bestPlan || price < VALU_CONFIG.minAmount) {
    return null; // Don't show for low-priced items
  }
  
  if (compact) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <CreditCard className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">
          or{' '}
          <span className="font-semibold text-foreground">
            {formatEGP(bestPlan.monthlyPayment)}/mo
          </span>
          {' '}× {bestPlan.months}
        </span>
      </div>
    );
  }
  
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4', className)}>
      {showBadge && (
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
            ValU
          </div>
          <span className="text-xs text-muted-foreground">0% Interest Available</span>
        </div>
      )}
      
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-foreground">
          {formatEGP(bestPlan.monthlyPayment)}
        </span>
        <span className="text-muted-foreground">/month</span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {bestPlan.months} monthly payments • Total: {formatEGP(bestPlan.totalAmount)}
      </p>
      
      {allPlans.length > 1 && (
        <details className="group">
          <summary className="text-xs text-primary cursor-pointer hover:underline">
            View all payment plans ({allPlans.length} options)
          </summary>
          <div className="mt-2 space-y-1">
            {allPlans.map(plan => (
              <div 
                key={plan.months} 
                className="flex justify-between text-xs text-muted-foreground py-1 border-b border-border last:border-0"
              >
                <span>{plan.months} months</span>
                <span className="font-medium text-foreground">
                  {formatEGP(plan.monthlyPayment)}/mo
                </span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export default ValuInstallmentCalculator;
