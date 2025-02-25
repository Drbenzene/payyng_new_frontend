import { Skeleton } from "@/components/ui/skeleton";

export function BillsPaymentSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:w-[500px] w-full bg-white rounded-xl p-5 mt-5">
        <div className="grid grid-cols-1 gap-y-4">
          {/* ID Dropdown Skeleton */}
          <div className="mb-2">
            <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>

          {/* Amount Skeleton */}
          <div className="mb-2">
            <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>

          {/* Jamb Registration Number Skeleton (conditional) */}
          <div className="mb-2">
            <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>

          {/* Button Skeleton */}
          <div className="mt-4">
            <Skeleton className="h-12 w-full bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
