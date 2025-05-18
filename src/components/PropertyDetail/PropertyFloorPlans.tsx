
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ResponsiveImage';

interface PropertyFloorPlansProps {
  property: Property;
}

const PropertyFloorPlans = ({ property }: PropertyFloorPlansProps) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-semibold mb-6">Available Floor Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {property.floorPlans.map((plan, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-[4/3]">
              <ResponsiveImage
                src={plan.image}
                alt={plan.name}
                className="w-full h-full"
                objectFit="cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
              <div className="flex items-center gap-x-4 text-sm mb-3">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{plan.bedrooms} Bed</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{plan.bathrooms} Bath</span>
                </div>
                <div>
                  <span>{plan.squareFeet} sq ft</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">${plan.price.toLocaleString()}</div>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PropertyFloorPlans;
