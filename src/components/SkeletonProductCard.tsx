import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProductCard = () => (
  <div className="rounded-sm overflow-hidden bg-cream">
    <Skeleton className="aspect-[4/5] w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="h-px bg-champagne/20 my-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  </div>
);

export default SkeletonProductCard;
