import { Skeleton } from "@/components/ui/skeleton";

export function GiftCardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-start items-start border rounded-xl p-4 border-gray-300 animate-pulse"
        >
          {/* Logo Skeleton */}
          <Skeleton className="w-12 h-12 rounded-full my-3 bg-gray-200" />

          {/* Text Skeleton */}
          <Skeleton className="h-4 w-24 bg-gray-200 rounded mt-2" />
        </div>
      ))}
    </div>
  );
}
