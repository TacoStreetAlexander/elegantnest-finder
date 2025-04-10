
import { Property } from '../types/property';

export const propertyData: Property[] = [
  {
    id: 1,
    name: "The Grand Estates",
    city: "Austin",
    address: "1200 Luxury Lane",
    state: "TX",
    zipCode: "78701",
    propertyType: "Independent Living",
    priceRange: {
      min: 2500,
      max: 4800
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1250,
    description: "The Grand Estates offers luxurious independent living in the heart of Austin. Our community features spacious apartments with premium finishes, chef-prepared meals, and a full calendar of engaging activities. Residents enjoy concierge services, transportation, and access to our wellness center and spa. Experience retirement living at its finest with beautiful surroundings and attentive staff who cater to your every need.",
    shortDescription: "Luxury independent living in Austin featuring chef-prepared meals, concierge services, and wellness amenities.",
    amenities: [
      "24/7 Concierge", 
      "Gourmet Dining", 
      "Wellness Center", 
      "Heated Pool", 
      "Private Terraces",
      "Library",
      "Movie Theater",
      "Beauty Salon",
      "Transportation Services"
    ],
    features: [
      "Granite Countertops",
      "Stainless Steel Appliances",
      "Walk-in Closets",
      "Hardwood Floors",
      "Private Balcony",
      "Emergency Call System",
      "In-unit Laundry"
    ],
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    ],
    floorPlans: [
      {
        name: "Aspen",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 850,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
        price: 2500
      },
      {
        name: "Birchwood",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1250,
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3600
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(512) 555-1234",
      email: "info@grandestates.com"
    },
    website: "https://www.grandestates.com",
    latitude: 30.267153,
    longitude: -97.743057,
    yearBuilt: 2018,
    petFriendly: true,
    featured: true
  },
  {
    id: 2,
    name: "Lakeside Retreat",
    city: "Houston",
    address: "8500 Memorial Drive",
    state: "TX",
    zipCode: "77024",
    propertyType: "Assisted Living",
    priceRange: {
      min: 3200,
      max: 5500
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 900,
    description: "Nestled alongside a serene lake, Lakeside Retreat offers premium assisted living with personalized care plans. Our elegant apartments feature lake views, and residents enjoy restaurant-style dining with chef-prepared meals. Our professional staff provides assistance with daily activities while respecting independence. The community includes landscaped gardens, a therapy pool, and daily social events designed to enhance quality of life.",
    shortDescription: "Assisted living on a serene Houston lake with personalized care and premium amenities.",
    amenities: [
      "Lakefront Views", 
      "Fitness Center", 
      "Fine Dining", 
      "Walking Trails",
      "Art Studio",
      "Physical Therapy Services",
      "Wellness Programs",
      "Transportation Services",
      "24-Hour Care Staff"
    ],
    features: [
      "Emergency Response System",
      "Walk-in Showers",
      "Grab Bars",
      "Kitchenette",
      "Individual Climate Control",
      "Weekly Housekeeping",
      "Linen Service"
    ],
    images: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    ],
    floorPlans: [
      {
        name: "Cascade",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 750,
        image: "https://images.unsplash.com/photo-1595185325960-8150917d8577?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
        price: 3200
      },
      {
        name: "Driftwood",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 900,
        image: "https://images.unsplash.com/photo-1617098541973-bde896550fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3900
      }
    ],
    availability: "Limited Availability",
    contactInfo: {
      phone: "(713) 555-8765",
      email: "care@lakesideretreat.com"
    },
    website: "https://www.lakesideretreat.com",
    latitude: 29.772487,
    longitude: -95.388748,
    yearBuilt: 2015,
    petFriendly: true,
    featured: true
  },
  {
    id: 3,
    name: "Harmony Gardens",
    city: "Dallas",
    address: "5678 Tranquility Boulevard",
    state: "TX",
    zipCode: "75201",
    propertyType: "Continuing Care",
    priceRange: {
      min: 2800,
      max: 6200
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1350,
    description: "Harmony Gardens offers a continuum of care from independent living to memory care, allowing residents to age in place with dignity. Our beautifully designed campus features garden courtyards, walking paths, and elegant residences with modern amenities. Residents enjoy fine dining, cultural events, and wellness programs tailored to their needs. Our professional staff provides compassionate care and support, ensuring peace of mind for residents and their families.",
    shortDescription: "Full-spectrum senior care in Dallas with elegant accommodations and personalized service.",
    amenities: [
      "Garden Courtyard", 
      "Spa Services", 
      "Chef-Prepared Meals", 
      "Library & Media Room",
      "Fitness Center",
      "Chapel",
      "Game Room",
      "Transportation Services",
      "Rehabilitation Services"
    ],
    features: [
      "Designer Finishes",
      "Full Kitchens",
      "Spacious Bathrooms",
      "Crown Molding",
      "Ample Storage",
      "Emergency Call System",
      "Weekly Housekeeping"
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Evergreen",
        bedrooms: 1,
        bathrooms: 1.5,
        squareFeet: 950,
        image: "https://images.unsplash.com/photo-1612965607446-25e1332775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 2800
      },
      {
        name: "Foxglove",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1350,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 4200
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(214) 555-9876",
      email: "living@harmonygardens.com"
    },
    website: "https://www.harmonygardens.com",
    latitude: 32.7766642,
    longitude: -96.7969879,
    yearBuilt: 2019,
    petFriendly: true,
    featured: true
  },
  {
    id: 4,
    name: "Windsor Heights",
    city: "San Antonio",
    address: "7450 Luxury Drive",
    state: "TX",
    zipCode: "78209",
    propertyType: "Senior Apartments",
    priceRange: {
      min: 2200,
      max: 3800
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    description: "Windsor Heights offers premium independent living apartments designed exclusively for active seniors. Our community features spacious residences with modern amenities, beautiful common areas, and a variety of social and recreational opportunities. Residents enjoy a maintenance-free lifestyle with weekly housekeeping, scheduled transportation, and 24-hour security. Our location provides easy access to shopping, dining, and cultural attractions in San Antonio.",
    shortDescription: "Elegant senior apartments in San Antonio with premium amenities and social activities.",
    amenities: [
      "Rooftop Terrace", 
      "Fitness Studio", 
      "Resident Lounge", 
      "Business Center",
      "Community Garden",
      "BBQ Area",
      "Game Room",
      "Transportation Service",
      "Guest Suites"
    ],
    features: [
      "9-Foot Ceilings",
      "Quartz Countertops",
      "Wood-Style Flooring",
      "Washer and Dryer",
      "Walk-in Closets",
      "Private Patio/Balcony",
      "Smart Home Technology"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Gardenia",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 800,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 2200
      },
      {
        name: "Heather",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1100,
        image: "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3100
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(210) 555-3456",
      email: "leasing@windsorheights.com"
    },
    website: "https://www.windsorheights.com",
    latitude: 29.4241219,
    longitude: -98.4936282,
    yearBuilt: 2016,
    petFriendly: true,
    featured: false
  },
  {
    id: 5,
    name: "Willow Creek Estates",
    city: "Fort Worth",
    address: "3200 Meadow Lane",
    state: "TX",
    zipCode: "76109",
    propertyType: "Memory Care",
    priceRange: {
      min: 4500,
      max: 6800
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    description: "Willow Creek Estates provides specialized memory care in a secure, homelike environment designed to enhance quality of life for those with Alzheimer's and other forms of dementia. Our innovative programming includes therapeutic activities, sensory stimulation, and personalized care plans. Our experienced staff receives ongoing training in memory care techniques, and our purpose-built community includes memory cues, secure outdoor spaces, and thoughtfully designed living areas.",
    shortDescription: "Specialized memory care in Fort Worth with therapeutic programming and secure living spaces.",
    amenities: [
      "Secure Gardens", 
      "Therapy Rooms", 
      "Family Dining Room", 
      "Activity Centers",
      "Memory Stations",
      "Sensory Room",
      "Music Therapy",
      "24/7 Specialized Staff",
      "Family Education Program"
    ],
    features: [
      "Contrast Color Schemes",
      "Memory Boxes",
      "Motion Sensor Lighting",
      "Specialized Bathroom Fixtures",
      "Secured Entry/Exit",
      "Daily Housekeeping",
      "Laundry Service"
    ],
    images: [
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Iris",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 450,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 4500
      },
      {
        name: "Jasmine",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 650,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 5200
      }
    ],
    availability: "Limited Availability",
    contactInfo: {
      phone: "(817) 555-7890",
      email: "care@willowcreekestates.com"
    },
    website: "https://www.willowcreekestates.com",
    latitude: 32.7254117,
    longitude: -97.3208496,
    yearBuilt: 2017,
    petFriendly: false,
    featured: false
  },
  {
    id: 6,
    name: "Magnolia Place",
    city: "Austin",
    address: "9800 Premium Way",
    state: "TX",
    zipCode: "78731",
    propertyType: "Assisted Living",
    priceRange: {
      min: 3600,
      max: 5900
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 780,
    description: "Magnolia Place offers upscale assisted living in a boutique setting. Our intimate community provides personalized care with a high staff-to-resident ratio, ensuring individual attention. Residents enjoy elegantly appointed suites, farm-to-table dining, and a lifestyle focused on wellness and engagement. Our expertly trained team creates personalized care plans to support independence while providing assistance with daily activities as needed.",
    shortDescription: "Boutique assisted living in Austin with personalized care and upscale amenities.",
    amenities: [
      "Chef's Kitchen", 
      "Wellness Center", 
      "Theater Room", 
      "Private Dining Room",
      "Beauty Salon",
      "Meditation Garden",
      "Art Studio",
      "Concierge Services",
      "Scheduled Transportation"
    ],
    features: [
      "Luxury Finishes",
      "Barrier-Free Bathrooms",
      "Emergency Call System",
      "Individual Climate Control",
      "Kitchenette",
      "Daily Housekeeping",
      "Linen Service"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1560448075-d03ef2ebb8a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80"
    ],
    floorPlans: [
      {
        name: "Kensington",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 580,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3600
      },
      {
        name: "Lancaster",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 780,
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 4300
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(512) 555-6543",
      email: "living@magnoliaplace.com"
    },
    website: "https://www.magnoliaplace.com",
    latitude: 30.3548185,
    longitude: -97.7440352,
    yearBuilt: 2020,
    petFriendly: true,
    featured: false
  },
  {
    id: 7,
    name: "Riverside Villas",
    city: "San Antonio",
    address: "4200 River Road",
    state: "TX",
    zipCode: "78212",
    propertyType: "Independent Living",
    priceRange: {
      min: 2400,
      max: 4200
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: "Riverside Villas offers luxurious independent living with stunning river views. Our resort-style community features spacious villas, fine dining, and a comprehensive wellness program. Residents enjoy an active lifestyle with numerous social events, educational opportunities, and recreational activities. Our location provides the perfect balance of natural beauty and urban convenience, with easy access to San Antonio's cultural attractions.",
    shortDescription: "Resort-style independent living in San Antonio with river views and active social calendar.",
    amenities: [
      "Riverfront Views", 
      "Infinity Pool", 
      "Gourmet Restaurant", 
      "Tennis Courts",
      "Putting Green",
      "Bocce Court",
      "Fitness Center",
      "Wine Cellar",
      "Water Taxi Service"
    ],
    features: [
      "Gourmet Kitchens",
      "Premium Appliances",
      "Hardwood Floors",
      "Crown Molding",
      "Private Patio/Balcony",
      "Walk-in Closets",
      "In-unit Laundry"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Marigold",
        bedrooms: 1,
        bathrooms: 1.5,
        squareFeet: 925,
        image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 2400
      },
      {
        name: "Nightingale",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3300
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(210) 555-2345",
      email: "info@riversidevillas.com"
    },
    website: "https://www.riversidevillas.com",
    latitude: 29.4246002,
    longitude: -98.4935989,
    yearBuilt: 2014,
    petFriendly: true,
    featured: false
  },
  {
    id: 8,
    name: "Oakmont Gardens",
    city: "Houston",
    address: "6300 Park Avenue",
    state: "TX",
    zipCode: "77027",
    propertyType: "Continuing Care",
    priceRange: {
      min: 3100,
      max: 6500
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1150,
    description: "Oakmont Gardens offers a comprehensive continuum of care in an elegant setting. Our community allows residents to transition seamlessly between independent living, assisted living, and memory care as needs change. The campus features beautifully landscaped grounds, spacious residences, and upscale amenities that cater to discerning seniors. Our professional staff provides personalized care with dignity and respect, ensuring the highest quality of life at every stage.",
    shortDescription: "Elegant continuing care in Houston with seamless transitions between care levels.",
    amenities: [
      "Formal Gardens", 
      "Heated Indoor Pool", 
      "Multiple Dining Venues", 
      "Art Studio",
      "Performance Theater",
      "Library",
      "Rehabilitation Center",
      "Computer Lab",
      "Landscaped Walking Paths"
    ],
    features: [
      "Designer Finishes",
      "Large Windows",
      "Spacious Closets",
      "Ceiling Fans",
      "Emergency Response System",
      "Weekly Housekeeping",
      "Scheduled Transportation"
    ],
    images: [
      "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600563438938-a9a27215d8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Orchid",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 820,
        image: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 3100
      },
      {
        name: "Primrose",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1150,
        image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        price: 4500
      }
    ],
    availability: "Waitlist",
    contactInfo: {
      phone: "(713) 555-1234",
      email: "info@oakmontgardens.com"
    },
    website: "https://www.oakmontgardens.com",
    latitude: 29.7325089,
    longitude: -95.4523354,
    yearBuilt: 2015,
    petFriendly: true,
    featured: false
  },
  {
    id: 9,
    name: "Serenity Heights",
    city: "Dallas",
    address: "1200 Highland Drive",
    state: "TX",
    zipCode: "75205",
    propertyType: "Senior Apartments",
    priceRange: {
      min: 1900,
      max: 3400
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 850,
    description: "Serenity Heights offers luxury apartment living designed exclusively for active adults 55 and better. Our community combines upscale features with convenient services to create a maintenance-free lifestyle. Residents enjoy modern apartments with premium finishes, resort-style amenities, and a vibrant social calendar. Located in the heart of Dallas, the community provides easy access to shopping, dining, and entertainment options.",
    shortDescription: "Upscale 55+ apartments in Dallas with resort amenities and social programming.",
    amenities: [
      "Resort-style Pool", 
      "State-of-the-art Fitness Center", 
      "Community Lounge", 
      "Dog Park",
      "Outdoor Kitchen",
      "Movie Theater",
      "Business Center",
      "Guest Suites",
      "Weekly Social Events"
    ],
    features: [
      "Modern Kitchens",
      "Stainless Steel Appliances",
      "Wood Plank Flooring",
      "Granite Countertops",
      "Washer/Dryer",
      "Walk-in Closets",
      "Private Balcony"
    ],
    images: [
      "https://images.unsplash.com/photo-1559599238-308793637427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1167&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    floorPlans: [
      {
        name: "Quartz",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 700,
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1084&q=80",
        price: 1900
      },
      {
        name: "Ruby",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 850,
        image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1179&q=80",
        price: 2400
      }
    ],
    availability: "Available",
    contactInfo: {
      phone: "(214) 555-4321",
      email: "leasing@serenityheights.com"
    },
    website: "https://www.serenityheights.com",
    latitude: 32.8325342,
    longitude: -96.7861519,
    yearBuilt: 2018,
    petFriendly: true,
    featured: false
  }
];
