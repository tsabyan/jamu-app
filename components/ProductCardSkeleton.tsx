export default function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] w-full bg-stone-200 dark:bg-stone-800" />

      <div className="flex flex-col flex-grow p-5">
        {/* Title Skeleton */}
        <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md w-3/4 mb-3" />

        {/* Description Skeleton */}
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-md w-full mb-2" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-md w-2/3 mb-4" />

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md w-24" />
          <div className="h-9 bg-stone-200 dark:bg-stone-800 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
