
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export const BlogPostCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-5">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-8 w-24 mt-4" />
      </CardContent>
    </Card>
  );
};

export const BlogPostDetailSkeleton = () => {
  return (
    <div className="container-custom py-12">
      <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-48 mx-auto mb-8" />
      <Skeleton className="aspect-[21/9] w-full mb-8 rounded-lg" />
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </div>
  );
};

export const BlogIndexSkeleton = () => {
  return (
    <div className="container-custom py-12">
      <Skeleton className="h-10 w-48 mb-2" />
      <Skeleton className="h-5 w-96 mb-12" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
