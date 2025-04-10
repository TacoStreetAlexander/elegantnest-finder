
import { MapPin } from 'lucide-react';
import MapContainer from './MapContainer';

const MapEmptyState = () => {
  return (
    <MapContainer>
      <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-50">
        <div className="bg-white border rounded-lg p-6 shadow-md max-w-md w-full text-center">
          <MapPin size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Properties Found</h3>
          <p className="text-muted-foreground">
            No properties available to display on the map. Please check your filters or try a different region.
          </p>
        </div>
      </div>
    </MapContainer>
  );
};

export default MapEmptyState;
