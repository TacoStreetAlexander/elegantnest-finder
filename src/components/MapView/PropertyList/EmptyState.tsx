
import { MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  resetFilters: () => void;
  selectedRegion: string;
  handleRegionChange: (region: string) => void;
  message?: string;
}

const EmptyState = ({ 
  hasActiveFilters, 
  resetFilters, 
  selectedRegion, 
  handleRegionChange,
  message 
}: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-[calc(100%-4rem)]">
      <div className="text-center px-4 py-8">
        <MapPinOff size={36} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-serif font-medium mb-2">
          {hasActiveFilters 
            ? "No properties match your filters" 
            : "No properties found"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {message || (hasActiveFilters 
            ? "No senior housing communities match your filters. Try changing your selections." 
            : "Try selecting a different region or check the Supabase connection")}
        </p>
        {hasActiveFilters ? (
          <Button onClick={resetFilters} variant="default">
            Reset Filters
          </Button>
        ) : (
          selectedRegion && selectedRegion !== 'all-regions' && (
            <Button
              onClick={() => handleRegionChange('all-regions')}
              className="btn-primary"
            >
              View all properties
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default EmptyState;
