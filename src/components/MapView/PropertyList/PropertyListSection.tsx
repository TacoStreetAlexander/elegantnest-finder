
import { RefObject, useState } from 'react';
import { Property } from '@/types/property';
import FilterHeader from './FilterHeader';
import EmptyState from './EmptyState';
import PropertyList from './PropertyList';
import { filterProperties } from './filterUtils';

interface PropertyListSectionProps {
  listingRef: RefObject<HTMLDivElement>;
  filteredProperties: Property[];
  selectedProperty: number | null;
  onSelectProperty: (id: number) => void;
  handleRegionChange: (region: string) => void;
  selectedRegion: string;
}

const PropertyListSection = ({
  listingRef,
  filteredProperties,
  selectedProperty,
  onSelectProperty,
  handleRegionChange,
  selectedRegion
}: PropertyListSectionProps) => {
  // Local state for additional filters
  const [cityFilter, setCityFilter] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique cities from properties
  const cities = Array.from(new Set(filteredProperties.map(property => property.city))).sort();
  
  // Filter properties based on additional filters
  const displayedProperties = filterProperties(
    filteredProperties,
    cityFilter,
    selectedAmenities,
    selectedBedrooms
  );
  
  // Check if any filters are active
  const hasActiveFilters = cityFilter !== '' || selectedAmenities.length > 0 || selectedBedrooms.length > 0;
  
  // Handle city filter change
  const handleCityChange = (city: string) => {
    setCityFilter(city);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setCityFilter('');
    setSelectedAmenities([]);
    setSelectedBedrooms([]);
    if (selectedRegion !== 'all-regions') {
      handleRegionChange('all-regions');
    }
  };
  
  // If no properties found initially
  if (filteredProperties.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptyState
          hasActiveFilters={false}
          resetFilters={resetFilters}
          selectedRegion={selectedRegion}
          handleRegionChange={handleRegionChange}
        />
      </div>
    );
  }
  
  // If properties exist but none match the filters
  if (displayedProperties.length === 0 && hasActiveFilters) {
    return (
      <div className="h-full">
        <FilterHeader
          cities={cities}
          cityFilter={cityFilter}
          handleCityChange={handleCityChange}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          selectedBedrooms={selectedBedrooms}
          setSelectedBedrooms={setSelectedBedrooms}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
          selectedRegion={selectedRegion}
          handleRegionChange={handleRegionChange}
          message="No senior housing communities match your filters. Try changing your selections."
        />
      </div>
    );
  }
  
  // Default view with properties
  return (
    <div className="h-full flex flex-col">
      <FilterHeader
        cities={cities}
        cityFilter={cityFilter}
        handleCityChange={handleCityChange}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        selectedBedrooms={selectedBedrooms}
        setSelectedBedrooms={setSelectedBedrooms}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      
      <div ref={listingRef} className="flex-1 overflow-y-auto pr-2 space-y-2">
        <PropertyList
          properties={displayedProperties}
          selectedProperty={selectedProperty}
          onSelect={onSelectProperty}
        />
      </div>
    </div>
  );
};

export default PropertyListSection;
