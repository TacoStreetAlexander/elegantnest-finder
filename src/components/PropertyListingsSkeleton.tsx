
const PropertyListingsSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-xl overflow-hidden border border-border bg-white shadow-sm animate-pulse">
          {/* Image placeholder */}
          <div className="h-48 bg-muted"></div>
          
          {/* Content */}
          <div className="p-5">
            {/* Title and location */}
            <div className="mb-4">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
            
            {/* Features */}
            <div className="flex gap-4 my-4">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
            
            {/* Description */}
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
            
            {/* Price */}
            <div className="h-5 bg-muted rounded w-1/3 mb-4"></div>
            
            {/* Amenities */}
            <div className="flex gap-2 mb-5">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-16"></div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3">
              <div className="h-10 bg-muted rounded flex-1"></div>
              <div className="h-10 bg-muted rounded flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListingsSkeleton;
