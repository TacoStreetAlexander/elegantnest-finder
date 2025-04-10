
import { useState, useEffect } from 'react';
import { Slider } from '../components/ui/slider';
import { Property } from '../types/property';

interface PropertyFiltersProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  propertyData: Property[];
}

const PropertyFilters = ({ searchParams, setSearchParams, propertyData }: PropertyFiltersProps) => {
  // Extract all metro regions from property data
  const metroRegions = Array.from(new Set(propertyData.map(property => property.metroRegion))).filter(Boolean);
  
  // Extract all amenities from property data
  const allAmenities = propertyData.flatMap(property => property.amenities);
  const uniqueAmenities = Array.from(new Set(allAmenities)).sort();
  
  // Extract all possible bedroom counts
  const bedroomOptions = Array.from(new Set(propertyData.map(property => property.bedrooms))).sort((a, b) => a - b);
  
  // Get price range
  const minPriceInData = Math.min(...propertyData.map(property => property.priceRange.min));
  const maxPriceInData = Math.max(...propertyData.map(property => property.priceRange.max));
  
  // Initial state based on URL params
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('minPrice') || minPriceInData.toString()),
    parseInt(searchParams.get('maxPrice') || maxPriceInData.toString())
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get('bedrooms') || '');
  
  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    // Reset pagination when filters change
    newParams.delete('page');
    
    // Update region parameter
    if (selectedRegion) {
      newParams.set('region', selectedRegion);
    } else {
      newParams.delete('region');
    }
    
    // Update price parameters
    newParams.set('minPrice', priceRange[0].toString());
    newParams.set('maxPrice', priceRange[1].toString());
    
    // Update amenities parameter
    if (selectedAmenities.length > 0) {
      newParams.set('amenities', selectedAmenities.join(','));
    } else {
      newParams.delete('amenities');
    }
    
    // Update bedrooms parameter
    if (selectedBedrooms) {
      newParams.set('bedrooms', selectedBedrooms);
    } else {
      newParams.delete('bedrooms');
    }
    
    setSearchParams(newParams);
  }, [selectedRegion, priceRange, selectedAmenities, selectedBedrooms]);
  
  // Handle region change
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region === selectedRegion ? '' : region);
  };
  
  // Handle amenity selection
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Handle bedroom selection
  const handleBedroomChange = (bedrooms: string) => {
    setSelectedBedrooms(bedrooms === selectedBedrooms ? '' : bedrooms);
  };
  
  // Handle price slider change
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  // Handle reset filters
  const resetFilters = () => {
    setSelectedRegion('');
    setPriceRange([minPriceInData, maxPriceInData]);
    setSelectedAmenities([]);
    setSelectedBedrooms('');
    setSearchParams(new URLSearchParams());
  };
  
  // Check if any filters are active
  const hasActiveFilters = selectedRegion || 
    selectedAmenities.length > 0 || 
    selectedBedrooms || 
    priceRange[0] > minPriceInData || 
    priceRange[1] < maxPriceInData;
  
  return (
    <div className="bg-white rounded-lg border p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-gold hover:text-gold-dark"
          >
            Reset all
          </button>
        )}
      </div>
      
      {/* Location Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-3">Location</h3>
        <div className="space-y-2">
          {metroRegions.map(region => (
            <div key={region} className="flex items-center">
              <button
                className={`flex items-center w-full py-1.5 px-2 rounded-md text-left ${
                  selectedRegion === region 
                    ? 'bg-gold/10 text-gold' 
                    : 'hover:bg-secondary'
                }`}
                onClick={() => handleRegionChange(region)}
              >
                <div className={`w-4 h-4 mr-2 flex-shrink-0 rounded-sm border ${
                  selectedRegion === region 
                    ? 'bg-gold border-gold' 
                    : 'border-input'
                }`}>
                  {selectedRegion === region && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white w-4 h-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span>{region}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            min={minPriceInData}
            max={maxPriceInData}
            step={100}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0].toLocaleString()}</span>
            <span className="text-sm">${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Bedrooms Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-3">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map(bedrooms => (
            <button
              key={bedrooms}
              onClick={() => handleBedroomChange(bedrooms.toString())}
              className={`px-3 py-1.5 rounded-md text-sm ${
                selectedBedrooms === bedrooms.toString()
                  ? 'bg-gold text-white'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {bedrooms}
            </button>
          ))}
        </div>
      </div>
      
      {/* Amenities Filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3">Amenities</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
          {uniqueAmenities.map(amenity => (
            <div key={amenity} className="flex items-center">
              <button
                className={`flex items-center w-full py-1.5 px-2 rounded-md text-left ${
                  selectedAmenities.includes(amenity) 
                    ? 'bg-gold/10 text-gold' 
                    : 'hover:bg-secondary'
                }`}
                onClick={() => handleAmenityChange(amenity)}
              >
                <div className={`w-4 h-4 mr-2 flex-shrink-0 rounded-sm border ${
                  selectedAmenities.includes(amenity) 
                    ? 'bg-gold border-gold' 
                    : 'border-input'
                }`}>
                  {selectedAmenities.includes(amenity) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white w-4 h-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-sm">{amenity}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
