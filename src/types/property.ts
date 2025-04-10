
export interface Property {
  id: number;
  name: string;
  city: string;
  address: string;
  state: string;
  zipCode: string;
  metroRegion?: string;
  propertyType: 'Independent Living' | 'Assisted Living' | 'Memory Care' | 'Continuing Care' | 'Senior Apartments';
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  shortDescription: string;
  amenities: string[];
  features: string[];
  images: string[];
  floorPlans: {
    name: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    image: string;
    price: number;
  }[];
  availability: 'Available' | 'Limited Availability' | 'Waitlist';
  contactInfo: {
    phone: string;
    email: string;
  };
  website: string;
  latitude: number;
  longitude: number;
  yearBuilt: number;
  petFriendly: boolean;
  featured: boolean;
  urlSlug?: string; // Add urlSlug field
}
