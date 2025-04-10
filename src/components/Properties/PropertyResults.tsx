
import { Property } from '@/types/property';
import PropertyListing from '@/components/PropertyListing';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface PropertyResultsProps {
  filteredProperties: Property[];
  currentProperties: Property[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

const PropertyResults = ({
  filteredProperties,
  currentProperties,
  totalPages,
  currentPage,
  paginate,
  setSearchParams
}: PropertyResultsProps) => {
  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-serif mb-4">No properties match your criteria</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
        <button
          onClick={() => setSearchParams(new URLSearchParams())}
          className="btn-primary"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentProperties.map((property) => (
          <PropertyListing key={property.id} property={property} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => paginate(page)}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default PropertyResults;
