
import { useRef, useEffect } from 'react';
import { Property } from '../../types/property';
import PropertyMapView from './PropertyMapView';
import MapLoadingIndicator from './MapLoadingIndicator';
import MapErrorState from './MapErrorState';
import MapEmptyState from './MapEmptyState';
import { useIsMobile } from '../../hooks/use-mobile';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
}

const PropertyMapWrapper = ({ properties, selectedPropertyId, onPropertySelect }: PropertyMapProps) => {
  // Use a ref instead of state to prevent re-renders
  const isMountedRef = useRef(false);
  const isMobile = useIsMobile();
  
  // Set component as mounted immediately
  useEffect(() => {
    console.log('PropertyMapWrapper component mounted');
    // Set mounted immediately instead of using a timeout
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      console.log('PropertyMapWrapper component unmounted');
    };
  }, []);
  
  // Show empty state if no properties available
  if (properties.length === 0) {
    return <MapEmptyState />;
  }
  
  return (
    <PropertyMapView
      properties={properties}
      selectedPropertyId={selectedPropertyId}
      onPropertySelect={onPropertySelect}
      isComponentMounted={isMountedRef.current}
      isMobile={isMobile}
    />
  );
};

export default PropertyMapWrapper;
