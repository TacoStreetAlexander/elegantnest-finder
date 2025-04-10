
import { Property } from '@/types/property';

export const filterProperties = (
  properties: Property[], 
  cityFilter: string, 
  selectedAmenities: string[],
  selectedBedrooms: string[]
): Property[] => {
  let result = [...properties];
  
  // Apply city filter
  if (cityFilter) {
    result = result.filter(property => 
      property.city.toLowerCase() === cityFilter.toLowerCase());
  }
  
  // Apply amenities filter
  if (selectedAmenities.length > 0) {
    result = result.filter(property => 
      selectedAmenities.every(amenity => 
        property.amenities.some(a => 
          a.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    );
  }
  
  // Apply bedroom filter
  if (selectedBedrooms.length > 0) {
    result = result.filter(property => {
      const hasStudio = selectedBedrooms.includes('Studio') && 
        property.floorPlans.some(plan => 
          plan.name.toLowerCase().includes('studio') || 
          (plan.bedrooms === 0 && plan.name.toLowerCase().includes('studio')));
      
      const has1Bed = selectedBedrooms.includes('1BR') && 
        property.floorPlans.some(plan => 
          plan.bedrooms === 1 || plan.name.toLowerCase().includes('1 bed'));
      
      const has2Bed = selectedBedrooms.includes('2BR') && 
        property.floorPlans.some(plan => 
          plan.bedrooms === 2 || plan.name.toLowerCase().includes('2 bed'));
      
      const has3Bed = selectedBedrooms.includes('3BR') && 
        property.floorPlans.some(plan => 
          plan.bedrooms === 3 || plan.name.toLowerCase().includes('3 bed'));
      
      return hasStudio || has1Bed || has2Bed || has3Bed;
    });
  }
  
  return result;
};
