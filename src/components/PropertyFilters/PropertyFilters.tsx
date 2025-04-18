import { useEffect, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, X, Dumbbell, Waves, PawPrint, Utensils, Activity, Bus, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { Property } from '@/types/property';
import { useAuth } from '@/hooks/useAuth';

const COMMON_AMENITIES = [
  { name: 'Gym', icon: Dumbbell },
  { name: 'Pool', icon: Waves },
  { name: 'Pet Friendly', icon: PawPrint },
  { name: 'Dining', icon: Utensils },
  { name: 'Activities', icon: Activity },
  { name: 'Transportation', icon: Bus },
  { name: 'Security', icon: Shield }
];

const BEDROOM_TYPES = ['Studio', '1', '2', '3'];

interface PropertyFiltersProps {
  properties: Property[];
  showMobileToggle?: boolean;
  onToggleMobileFilters?: () => void;
  isMobileFiltersOpen?: boolean;
}

export function PropertyFilters({
  properties,
  showMobileToggle = false,
  onToggleMobileFilters,
  isMobileFiltersOpen
}: PropertyFiltersProps) {
  const { isLoggedIn } = useAuth();
  const { savedPropertyIds } = useSavedProperties();
  const {
    metroRegion,
    setMetroRegion,
    selectedBedrooms,
    setSelectedBedrooms,
    priceRange,
    setPriceRange,
    selectedAmenities,
    setSelectedAmenities,
    showSavedOnly,
    setShowSavedOnly,
    clearFilters
  } = usePropertyFilters();

  const metroRegions = useMemo(() => {
    const regions = Array.from(new Set(properties.map(p => p.metroRegion).filter(Boolean)));
    return regions.sort();
  }, [properties]);

  const [minPrice, maxPrice] = useMemo(() => {
    if (properties.length === 0) return [0, 10000];
    const prices = properties.map(p => p.priceRange.min);
    return [Math.min(...prices), Math.max(...prices)];
  }, [properties]);

  useEffect(() => {
    if (priceRange[0] < minPrice || priceRange[1] > maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const hasActiveFilters = metroRegion || selectedBedrooms.length > 0 || 
    selectedAmenities.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice || showSavedOnly;

  return (
    <div className="space-y-6">
      {showMobileToggle && (
        <div className="lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleMobileFilters}
            className="w-full"
          >
            <Filter className="mr-2 h-4 w-4" />
            {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            {hasActiveFilters && (
              <span className="ml-2 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {selectedBedrooms.length + selectedAmenities.length + (metroRegion ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
      )}

      <div className={`space-y-4 ${showMobileToggle ? 'lg:block' : ''} ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
        {isLoggedIn && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Show Saved Only</label>
            <Switch 
              checked={showSavedOnly}
              onCheckedChange={setShowSavedOnly}
              aria-label="Toggle saved properties filter"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-2 block">Metro Region</label>
          <Select value={metroRegion} onValueChange={setMetroRegion}>
            <SelectTrigger>
              <SelectValue placeholder="All Regions" />
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

        <div>
          <label className="text-sm font-medium mb-2 block">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            {BEDROOM_TYPES.map(type => (
              <Button
                key={type}
                variant={selectedBedrooms.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedBedrooms(
                    selectedBedrooms.includes(type)
                      ? selectedBedrooms.filter(b => b !== type)
                      : [...selectedBedrooms, type]
                  );
                }}
              >
                {type} {type !== 'Studio' && 'BR'}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="px-2">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="my-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_AMENITIES.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant={selectedAmenities.includes(name) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedAmenities(
                    selectedAmenities.includes(name)
                      ? selectedAmenities.filter(a => a !== name)
                      : [...selectedAmenities, name]
                  );
                }}
                className="flex items-center gap-2"
              >
                <Icon className={`h-4 w-4 ${selectedAmenities.includes(name) ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                {name}
              </Button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" />
            Reset All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
