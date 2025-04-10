
import { Property } from '../types/property';

// Mock data for fallback
export const getMockProperties = (): Property[] => {
  return [{
    id: 1,
    name: 'Sample Senior Living',
    city: 'Austin',
    address: '123 Main St',
    state: 'TX',
    zipCode: '78701',
    metroRegion: 'Austin',
    propertyType: 'Independent Living',
    priceRange: {
      min: 2500,
      max: 5000
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    description: 'This is a sample property with valid coordinates.',
    shortDescription: 'Sample property in Austin area.',
    amenities: ['Pool', 'Fitness Center', 'Dining'],
    features: [],
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"],
    floorPlans: [{
      name: 'Standard Suite',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      price: 2500
    }],
    availability: 'Available',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'info@seniorliving.com'
    },
    website: 'https://example.com',
    latitude: 30.2672,
    longitude: -97.7431,
    yearBuilt: 2020,
    petFriendly: true,
    featured: true
  }];
};
