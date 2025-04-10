
import { Loader } from 'lucide-react';
import MapContainer from './MapContainer';

interface MapLoadingIndicatorProps {
  overlay?: boolean;
}

const MapLoadingIndicator = ({ overlay }: MapLoadingIndicatorProps) => {
  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3">
          <Loader size={24} className="animate-spin text-primary" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <MapContainer>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50/50">
        <Loader size={32} className="animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading map data...</p>
      </div>
    </MapContainer>
  );
};

export default MapLoadingIndicator;
