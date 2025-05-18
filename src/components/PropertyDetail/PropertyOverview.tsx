
import { Property } from '@/types/property';

interface PropertyOverviewProps {
  property: Property;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-serif font-semibold mb-4">About {property.name}</h2>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">{property.shortDescription}</p>
          <p>{property.description}</p>
        </div>
        
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Property Features</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {property.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-muted-foreground">
                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Property Type</span>
            <span className="font-medium">{property.propertyType}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Year Built</span>
            <span className="font-medium">{property.yearBuilt}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Region</span>
            <span className="font-medium">{property.metroRegion}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Availability</span>
            <span className="font-medium">{property.availability}</span>
          </div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-muted-foreground">Pet Policy</span>
            <span className="font-medium">{property.petFriendly ? 'Pet Friendly' : 'No Pets Allowed'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
