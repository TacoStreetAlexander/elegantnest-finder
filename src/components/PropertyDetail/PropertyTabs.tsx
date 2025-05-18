
import { Property } from '@/types/property';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyOverview from './PropertyOverview';
import PropertyFloorPlans from './PropertyFloorPlans';
import PropertyAmenities from './PropertyAmenities';

interface PropertyTabsProps {
  property: Property;
}

const PropertyTabs = ({ property }: PropertyTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-12">
      <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="floorplans">Floor Plans</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-8">
        <PropertyOverview property={property} />
      </TabsContent>
      
      <TabsContent value="floorplans" className="mt-8">
        <PropertyFloorPlans property={property} />
      </TabsContent>
      
      <TabsContent value="amenities" className="mt-8">
        <PropertyAmenities property={property} />
      </TabsContent>
    </Tabs>
  );
};

export default PropertyTabs;
