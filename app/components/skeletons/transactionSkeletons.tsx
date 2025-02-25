import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeletons() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
        <Skeleton className="h-10 bg-gray-200 w-full" />
      </div>
    </div>
  );
}
