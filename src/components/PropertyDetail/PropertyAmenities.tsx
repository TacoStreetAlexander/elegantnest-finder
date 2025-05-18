
import { Property } from '@/types/property';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface PropertyAmenitiesProps {
  property: Property;
}

const PropertyAmenities = ({ property }: PropertyAmenitiesProps) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-semibold mb-6">Amenities & Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {property.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center py-2 border-b">
            <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      
      <Accordion type="single" collapsible className="mt-12">
        <AccordionItem value="contactinfo">
          <AccordionTrigger>Contact Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Phone:</strong> {property.contactInfo.phone}</p>
              <p><strong>Email:</strong> {property.contactInfo.email}</p>
              {property.website && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a 
                    href={property.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    {property.website}
                  </a>
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="location">
          <AccordionTrigger>Location & Directions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Address:</strong> {property.address}</p>
              <p><strong>City:</strong> {property.city}</p>
              <p><strong>State:</strong> {property.state}</p>
              <p><strong>Zip Code:</strong> {property.zipCode}</p>
              <p><strong>Region:</strong> {property.metroRegion}</p>
              <Button variant="outline" className="mt-4" size="sm">
                <MapPin className="mr-2 h-4 w-4" /> View on Map
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default PropertyAmenities;
