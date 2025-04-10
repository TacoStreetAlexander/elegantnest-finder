
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import MapContainer from './MapContainer';
import { Property } from '@/types/property';

interface MapErrorStateProps {
  errorMessage: string;
  properties: Property[];
  updateMapboxToken: (token: string) => void;
}

const MapErrorState = ({ errorMessage, properties, updateMapboxToken }: MapErrorStateProps) => {
  const [mapboxToken, setMapboxToken] = useState('');

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapboxToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Mapbox access token",
        variant: "destructive"
      });
      return;
    }
    
    updateMapboxToken(mapboxToken);
    toast({
      title: "Success",
      description: "Mapbox token updated. Reloading map...",
    });
  };

  return (
    <MapContainer>
      <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-50">
        <div className="bg-white border rounded-lg p-6 shadow-md max-w-md w-full">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <AlertCircle size={20} />
            <h3 className="text-lg font-medium">Map Error</h3>
          </div>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mapbox-token" className="text-sm font-medium">
                Enter a valid Mapbox API token
              </label>
              <Input 
                id="mapbox-token"
                placeholder="pk.eyJ1Ijoid..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Get your token from <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a> (requires account)
              </p>
            </div>
            <Button type="submit" className="w-full">Update Token</Button>
          </form>
          
          {properties.length === 0 && (
            <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-md">
              <p className="text-sm text-amber-800">
                No properties available to display. Please check your filters or try a different region.
              </p>
            </div>
          )}
        </div>
      </div>
    </MapContainer>
  );
};

export default MapErrorState;
