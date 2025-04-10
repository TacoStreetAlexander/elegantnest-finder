
import { Property } from '../types/property';

// Helper function to transform raw data into Property type
export const transformPropertyData = (item: any): Property => {
  // Parse price ranges, ensuring we have valid numbers
  const minPrice = parseInt(item['1brstart']?.replace(/\D/g, '') || '2500');
  const maxPrice = parseInt(item['2brstart']?.replace(/\D/g, '') || '5000');

  // Validate amenities
  const amenitiesList = item.amenities ? 
    item.amenities.split(',').map((a: string) => a.trim()) : 
    ['Fitness Center', 'Community Room', 'Dining'];

  // Extract features if available, or provide defaults
  const featuresList = item.key_features ? 
    item.key_features.split(',').map((f: string) => f.trim()) :
    ['24-hour staff', 'Emergency call system', 'Scheduled transportation'];

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
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    description: item.headline || 'Experience luxury senior living in this exceptional community.',
    shortDescription: item.headline || 'Experience luxury senior living in this exceptional community.',
    amenities: amenitiesList,
    features: featuresList,
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"],
    floorPlans: [{
      name: 'Standard Suite',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: minPrice
    }],
    availability: 'Available',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'info@seniorliving.com'
    },
    website: item.website_link || '',
    latitude: parseFloat(item.latitude) || 30.2672,
    longitude: parseFloat(item.longitude) || -97.7431,
    yearBuilt: 2020,
    petFriendly: true,
    featured: true,
    urlSlug: item.url_slug || null
  };
};
