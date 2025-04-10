
import { Property } from '../../types/property';
import PropertyMapWrapper from './PropertyMapWrapper';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
}

/**
 * Main PropertyMap component that serves as an entry point to the map system.
 * This component is kept for API compatibility but delegates to PropertyMapWrapper.
 */
const PropertyMap = (props: PropertyMapProps) => {
  return <PropertyMapWrapper {...props} />;
};

export default PropertyMap;
