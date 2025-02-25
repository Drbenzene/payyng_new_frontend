import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Skeleton for individual card */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 bg-gray-200 rounded-md" />
              <Skeleton className="w-12 h-12 bg-gray-200 rounded-full" />
            </div>
            <div className="mt-8">
              <Skeleton className="h-8 w-48 bg-gray-200 rounded-md" />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <Skeleton className="h-5 w-32 bg-gray-200 rounded-md" />
                  <Skeleton className="h-6 w-32 bg-gray-200 rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-5 w-32 bg-gray-200 rounded-md" />
                  <Skeleton className="h-6 w-24 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
