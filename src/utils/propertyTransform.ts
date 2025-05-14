
import { Property } from '../types/property';

// Helper function to transform raw data into Property type
export const transformPropertyData = (item: any): Property => {
  // Parse price ranges, ensuring we have valid numbers
  const minPrice = parseInt(item['1brstart']?.replace(/\D/g, '') || '0');
  const maxPrice = parseInt(item['2brstart']?.replace(/\D/g, '') || '0');

  // Validate amenities
  const amenitiesList = item.amenities ? 
    item.amenities.split(',').map((a: string) => a.trim()) : 
    [];

  // Extract features if available, or provide defaults
  const featuresList = item.key_features ? 
    item.key_features.split(',').map((f: string) => f.trim()) :
    [];

  // Parse floorplan types if available
  const floorplanTypes = item.floorplan_types ? 
    item.floorplan_types.split(',').map((f: string) => f.trim()) : 
    [];

  // Determine bedrooms based on floorplan types
  const hasStudio = floorplanTypes.some(fp => 
    fp.toLowerCase().includes('studio'));
  const has1Bed = floorplanTypes.some(fp => 
    fp.toLowerCase().includes('1 bed') || fp.toLowerCase().includes('1bed'));
  const has2Bed = floorplanTypes.some(fp => 
    fp.toLowerCase().includes('2 bed') || fp.toLowerCase().includes('2bed'));
  const has3Bed = floorplanTypes.some(fp => 
    fp.toLowerCase().includes('3 bed') || fp.toLowerCase().includes('3bed'));

  // Create floor plans based on available types
  const floorPlans = [];
  
  if (hasStudio) {
    floorPlans.push({
      name: 'Studio',
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 500,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: minPrice * 0.8 // Studio is typically cheaper than 1BR
    });
  }
  
  if (has1Bed || !floorPlans.length) {
    floorPlans.push({
      name: '1 Bedroom',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 700,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: minPrice
    });
  }
  
  if (has2Bed) {
    floorPlans.push({
      name: '2 Bedroom',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 900,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: maxPrice
    });
  }
  
  if (has3Bed) {
    floorPlans.push({
      name: '3 Bedroom',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: maxPrice * 1.2 // 3BR is typically more expensive than 2BR
    });
  }

  // Ensure we have valid coordinates
  const latitude = parseFloat(item.latitude);
  const longitude = parseFloat(item.longitude);

  // Log warning if coordinates are missing or invalid
  if (isNaN(latitude) || isNaN(longitude)) {
    console.warn(`Invalid coordinates for property ${item.id}: lat=${item.latitude}, lng=${item.longitude}`);
  }

  return {
    id: item.id,
    name: item.name || 'Unnamed Property',
    city: item.city || 'Unknown City',
    address: item.address || '',
    state: item.state || 'TX',
    zipCode: item.zipCode ? item.zipCode.toString() : '',
    metroRegion: item.metroregion || 'Unknown Region',
    propertyType: 'Independent Living',
    priceRange: {
      min: minPrice,
      max: maxPrice
    },
    bedrooms: floorPlans.length > 0 ? floorPlans[0].bedrooms : 1,
    bathrooms: floorPlans.length > 0 ? floorPlans[0].bathrooms : 1,
    squareFeet: floorPlans.length > 0 ? floorPlans[0].squareFeet : 700,
    description: item.headline || 'Experience luxury senior living in this exceptional community.',
    shortDescription: item.headline || 'Experience luxury senior living in this exceptional community.',
    amenities: amenitiesList,
    features: featuresList,
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"],
    floorPlans: floorPlans,
    availability: 'Available',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'info@seniorliving.com'
    },
    website: item.website_link || '',
    latitude: !isNaN(latitude) ? latitude : null,
    longitude: !isNaN(longitude) ? longitude : null,
    yearBuilt: 2020,
    petFriendly: amenitiesList.some(a => 
      a.toLowerCase().includes('pet') || 
      a.toLowerCase().includes('dog') || 
      a.toLowerCase().includes('cat')),
    featured: true,
    urlSlug: item.url_slug || null
  };
};
