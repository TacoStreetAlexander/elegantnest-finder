
import { Property } from '@/types/property';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SaveButton from '@/components/SaveButton';

interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-secondary/30 py-8">
      <div className="container-custom">
        <button 
          onClick={() => navigate('/properties')}
          className="flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold">{property.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <SaveButton propertyId={property.id} className="text-sm" />
            {property.website && (
              <Button variant="default" asChild>
                <a href={property.website} target="_blank" rel="noopener noreferrer">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
