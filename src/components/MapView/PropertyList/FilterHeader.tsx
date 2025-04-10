import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Common amenities list
export const commonAmenities = [
  'Gym', 'Pool', 'Fitness Classes', 'Theater Room', 
  'Salon', 'Dog Park', 'On-Site Dining'
];

interface FilterHeaderProps {
  cities: string[];
  cityFilter: string;
  handleCityChange: (city: string) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  selectedBedrooms: string[];
  setSelectedBedrooms: (bedrooms: string[]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FilterHeader = ({
  cities,
  cityFilter,
  handleCityChange,
  selectedAmenities,
  setSelectedAmenities,
  selectedBedrooms,
  setSelectedBedrooms,
  resetFilters,
  hasActiveFilters,
  showFilters,
  setShowFilters
}: FilterHeaderProps) => {
  // Toggle amenity selection - fixed to use string[] type explicitly
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(selectedAmenities.includes(amenity) 
      ? selectedAmenities.filter(a => a !== amenity) 
      : [...selectedAmenities, amenity]
    );
  };

  return (
    <div className="mb-4 p-3 border-b">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs h-7 px-2"
        >
          <Filter size={14} className="mr-1" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters && <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">{selectedAmenities.length + selectedBedrooms.length + (cityFilter ? 1 : 0)}</span>}
        </Button>
      </div>
      
      {showFilters && (
        <div className="space-y-3 pt-2">
          {/* City Filter */}
          <div>
            <label className="text-xs font-medium mb-1 block">City</label>
            <Select value={cityFilter} onValueChange={handleCityChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Bedroom Types Filter */}
          <div>
            <label className="text-xs font-medium mb-1 block">Bedroom Types</label>
            <ToggleGroup 
              type="multiple" 
              className="flex flex-wrap justify-start gap-1"
              value={selectedBedrooms}
              onValueChange={setSelectedBedrooms}
            >
              <ToggleGroupItem value="Studio" size="sm" className="text-xs h-7 px-2">Studio</ToggleGroupItem>
              <ToggleGroupItem value="1BR" size="sm" className="text-xs h-7 px-2">1 BR</ToggleGroupItem>
              <ToggleGroupItem value="2BR" size="sm" className="text-xs h-7 px-2">2 BR</ToggleGroupItem>
              <ToggleGroupItem value="3BR" size="sm" className="text-xs h-7 px-2">3 BR</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Amenities Filter */}
          <div>
            <label className="text-xs font-medium mb-1 block">Amenities</label>
            <div className="flex flex-wrap gap-1">
              {commonAmenities.map(amenity => (
                <Button
                  key={amenity}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAmenityToggle(amenity)}
                  className="text-xs h-7 px-2"
                >
                  {amenity}
                </Button>
              ))}
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="text-xs w-full"
              >
                <X size={14} className="mr-1" />
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterHeader;
