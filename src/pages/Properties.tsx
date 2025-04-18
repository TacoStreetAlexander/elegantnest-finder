import { usePropertiesState } from '../hooks/usePropertiesState';
import Navbar from '../components/Navbar';
import PropertyListingsSkeleton from '../components/PropertyListingsSkeleton';
import Footer from '../components/Footer';
import PropertyResults from '../components/Properties/PropertyResults';
import { PropertyFilters } from '@/components/PropertyFilters/PropertyFilters';
import { PropertyFiltersProvider } from '@/hooks/usePropertyFilters';
import { propertyData } from '../data/propertyData';

const Properties = () => {
  const {
    isLoading,
    filteredProperties,
    currentProperties,
    totalPages,
    currentPage,
    supabaseProperties,
    paginate,
    searchParams,
    setSearchParams
  } = usePropertiesState();

  // Show loading message during initial load
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Luxury Senior Housing in Texas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Loading properties...
            </p>
          </div>
        </section>
        <div className="container-custom py-12">
          <PropertyListingsSkeleton count={6} />
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <PropertyFiltersProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Luxury Senior Housing in Texas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse our curated selection of premium senior living communities designed for comfort, elegance, and care.
            </p>
          </div>
        </section>
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - 1/4 of the grid on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-6">
                <PropertyFilters properties={supabaseProperties || propertyData} />
              </div>
            </div>
            
            {/* Results - 3/4 of the grid on desktop */}
            <div className="lg:col-span-3">
              <PropertyResults
                filteredProperties={filteredProperties}
                currentProperties={currentProperties}
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </PropertyFiltersProvider>
  );
};

export default Properties;
