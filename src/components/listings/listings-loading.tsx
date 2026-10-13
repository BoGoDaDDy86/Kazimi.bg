import { Skeleton } from "@/components/ui/skeleton";

export function ListingsLoading() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
