import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyListingsSkeleton from '../components/PropertyListingsSkeleton';
import { PropertyMap } from '../components/map';
import { useMapViewState } from '../hooks/useMapViewState';
import MapViewHeader from '../components/MapView/MapViewHeader';
import PropertyListSection from '../components/MapView/PropertyList';
import { useIsMobile } from '../hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PropertyFiltersProvider } from '@/hooks/usePropertyFilters';
import { PropertyFilters } from '@/components/PropertyFilters/PropertyFilters';

const MapView = () => {
  const {
    isLoading,
    error,
    selectedRegion,
    filteredProperties,
    selectedProperty,
    showMap,
    listingRef,
    metroRegions,
    handleRegionChange,
    handlePropertySelect,
    toggleMap
  } = useMapViewState();

  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log('MapView rendering:', {
      isLoading,
      hasError: !!error,
      propertiesCount: filteredProperties.length,
      selectedRegion,
      selectedProperty,
      isMobile
    });
  }, [isLoading, error, filteredProperties.length, selectedRegion, selectedProperty, isMobile]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container-custom py-6">
          <h1 className="text-3xl font-serif font-bold mb-6">
            Explore Senior Housing on the Map
          </h1>
          <PropertyListingsSkeleton count={6} />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Properties</h1>
          <p className="text-muted-foreground mb-6">
            We encountered an issue retrieving property data. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <PropertyFiltersProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        
        <div className="container-custom py-6">
          <MapViewHeader 
            metroRegions={metroRegions}
            selectedRegion={selectedRegion}
            handleRegionChange={handleRegionChange}
            toggleMap={toggleMap}
            showMap={showMap}
            propertiesCount={filteredProperties.length}
          />
          
          <div className="mt-6">
            <PropertyFilters 
              properties={filteredProperties}
              showMobileToggle={true}
              onToggleMobileFilters={toggleMap}
              isMobileFiltersOpen={!showMap}
            />
          </div>
          
          {isMobile ? (
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="list">📋 List View</TabsTrigger>
                <TabsTrigger value="map">🔍 Map View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="h-[calc(100vh-16rem)]">
                <PropertyListSection
                  listingRef={listingRef}
                  filteredProperties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={handlePropertySelect}
                  handleRegionChange={handleRegionChange}
                  selectedRegion={selectedRegion}
                />
              </TabsContent>
              
              <TabsContent value="map" className="h-[calc(100vh-16rem)]">
                <div className="h-full">
                  <PropertyMap 
                    properties={filteredProperties} 
                    selectedPropertyId={selectedProperty}
                    onPropertySelect={handlePropertySelect}
                  />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex h-[calc(100vh-16rem)] gap-6">
              <div className="w-[30%] overflow-hidden">
                <PropertyListSection
                  listingRef={listingRef}
                  filteredProperties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={handlePropertySelect}
                  handleRegionChange={handleRegionChange}
                  selectedRegion={selectedRegion}
                />
              </div>
              
              <div className="w-[70%] h-full">
                <PropertyMap 
                  properties={filteredProperties} 
                  selectedPropertyId={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </PropertyFiltersProvider>
  );
};

export default MapView;
