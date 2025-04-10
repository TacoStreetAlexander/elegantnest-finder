
import { useState, useEffect } from 'react';
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
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const isMobile = useIsMobile();
  
  // Set component as mounted after a small delay to ensure DOM is ready
  useEffect(() => {
    console.log('PropertyMapWrapper component mounted');
    const timer = setTimeout(() => {
      setIsComponentMounted(true);
      console.log('Setting component as mounted');
    }, 500);
    
    return () => {
      clearTimeout(timer);
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
      isComponentMounted={isComponentMounted}
      isMobile={isMobile}
    />
  );
};

export default PropertyMapWrapper;
