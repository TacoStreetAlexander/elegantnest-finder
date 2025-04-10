
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { List, Map as MapIcon } from 'lucide-react';

interface MapViewHeaderProps {
  metroRegions: string[];
  selectedRegion: string;
  handleRegionChange: (region: string) => void;
  toggleMap?: () => void;
  showMap?: boolean;
  propertiesCount: number;
}

const MapViewHeader = ({ 
  metroRegions, 
  selectedRegion, 
  handleRegionChange, 
  toggleMap, 
  showMap,
  propertiesCount 
}: MapViewHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-serif font-bold">
          Explore Senior Housing on the Map
        </h1>
        <p className="text-muted-foreground mt-1">
          {propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'} found
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-40 md:w-60">
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <SelectValue placeholder="All Regions" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions">All Regions</SelectItem>
              {metroRegions.map(region => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {toggleMap && (
          <button 
            className="md:hidden flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground"
            onClick={toggleMap}
          >
            {showMap ? (
              <>
                <List size={16} className="mr-2" />
                <span>List</span>
              </>
            ) : (
              <>
                <MapIcon size={16} className="mr-2" />
                <span>Map</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MapViewHeader;
