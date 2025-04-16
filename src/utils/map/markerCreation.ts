
import mapboxgl from 'mapbox-gl';
import { Property } from '../../types/property';

/**
 * Creates a marker element for the map
 */
export const createMarkerElement = (property: Property, isSelected: boolean = false): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.width = '32px';
  el.style.height = '32px';
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `Property: ${property.name}`);
  el.setAttribute('tabindex', '0');
  el.dataset.propertyId = property.id.toString();
  
  // Choose marker icon based on property type
  if (property.featured) {
    // Featured property - use building with star icon
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
      <circle cx="17" cy="3" r="3" fill="#F97316" stroke="#F97316" />
    </svg>`;
  } else if (property.availability && property.availability.toLowerCase().includes('available')) {
    // Available property - use house icon
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>`;
  } else {
    // Default property - use building icon
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#403E43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2">
      <path d="M6 22V4c0-.5.2-1 .6-1.4C7 2.2 7.5 2 8 2h8c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18" />
      <path d="M2 14h20" />
      <path d="M2 22h20" />
      <path d="M6 10h.01" />
      <path d="M6 6h.01" />
      <path d="M10 10h.01" />
      <path d="M10 6h.01" />
      <path d="M14 10h.01" />
      <path d="M14 6h.01" />
      <path d="M18 10h.01" />
      <path d="M18 6h.01" />
    </svg>`;
  }
  
  // Custom styles for better visibility
  el.style.cursor = 'pointer';
  el.style.borderRadius = '50%';
  el.style.transition = 'transform 0.2s ease, filter 0.2s ease';
  el.style.transformOrigin = 'center bottom';
  el.style.zIndex = '1';
  el.style.position = 'absolute';
  
  // Animation for hover and selection
  if (isSelected) {
    el.style.filter = 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.7))';
    el.style.transform = 'scale(1.2)';
    el.style.zIndex = '10';
  }
  
  // Add keyboard navigation
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      el.click();
      e.preventDefault();
    }
  });
  
  return el;
};

/**
 * Creates a marker popup with property information
 */
export const createPropertyPopup = (property: Property): mapboxgl.Popup => {
  // Ensure floorPlans exists and is an array
  const floorPlans = property.floorPlans || [];
  
  // Helper functions to generate floor plan info - safely check for floor plans
  const hasStudioPlan = floorPlans.some(plan => 
    plan && plan.name && plan.name.toLowerCase().includes('studio') || 
    (plan && plan.bedrooms === 0 && plan.name && plan.name.toLowerCase().includes('studio')));
  
  const has1BedPlan = floorPlans.some(plan => 
    plan && (plan.bedrooms === 1 || (plan.name && plan.name.toLowerCase().includes('1 bed'))));
  
  const has2BedPlan = floorPlans.some(plan => 
    plan && (plan.bedrooms === 2 || (plan.name && plan.name.toLowerCase().includes('2 bed'))));
  
  const has3BedPlan = floorPlans.some(plan => 
    plan && (plan.bedrooms === 3 || (plan.name && plan.name.toLowerCase().includes('3 bed'))));

  // Get starting price for each floor plan type - with improved error handling
  const getStartingPrice = (bedrooms: number) => {
    try {
      const plans = floorPlans.filter(plan => 
        plan && (
          plan.bedrooms === bedrooms || 
          (bedrooms === 0 && plan.name && plan.name.toLowerCase().includes('studio'))
        )
      );
      
      if (plans.length === 0) return null;
      
      // Filter out any undefined or non-numeric prices
      const prices = plans
        .map(plan => plan.price)
        .filter(price => price !== undefined && price !== null && !isNaN(price));
      
      if (prices.length === 0) return null;
      
      return Math.min(...prices);
    } catch (error) {
      console.error(`Error getting starting price for ${bedrooms} bedrooms:`, error);
      return null;
    }
  };

  const studioPrice = getStartingPrice(0);
  const bed1Price = getStartingPrice(1);
  const bed2Price = getStartingPrice(2);
  const bed3Price = getStartingPrice(3);
  
  // Format price - with null check
  const formatPrice = (price: number | null) => {
    if (price === null || isNaN(price)) return 'Call';
    return price.toLocaleString();
  };
  
  // Generate floor plan HTML
  let floorPlanHTML = '';
  
  if (hasStudioPlan && studioPrice) {
    floorPlanHTML += `<div class="text-xs mb-1">Studio from $${formatPrice(studioPrice)}</div>`;
  }
  
  if (has1BedPlan && bed1Price) {
    floorPlanHTML += `<div class="text-xs mb-1">1BR from $${formatPrice(bed1Price)}</div>`;
  }
  
  if (has2BedPlan && bed2Price) {
    floorPlanHTML += `<div class="text-xs mb-1">2BR from $${formatPrice(bed2Price)}</div>`;
  }
  
  if (has3BedPlan && bed3Price) {
    floorPlanHTML += `<div class="text-xs mb-1">3BR from $${formatPrice(bed3Price)}</div>`;
  }
  
  // If no floor plan HTML was generated, show a default message
  if (!floorPlanHTML) {
    floorPlanHTML = '<div class="text-xs mb-1">Contact for pricing</div>';
  }
  
  // Safely access property fields with fallbacks
  const propertyName = property.name || 'Property';
  const propertyCity = property.city || '';
  const propertyState = property.state || '';
  const locationText = propertyCity && propertyState 
    ? `${propertyCity}, ${propertyState}` 
    : propertyCity || propertyState || 'Location unavailable';
  
  // Create popup with improved hover handling
  const popup = new mapboxgl.Popup({ 
    offset: 25,
    closeButton: false,
    className: 'property-popup',
    closeOnClick: false, // Prevent popup from closing when clicked
    focusAfterOpen: false // Prevent focus stealing
  })
    .setHTML(`
      <div class="p-3 property-popup-content" data-property-id="${property.id}">
        <div class="marker-popup-bridge bridge-top"></div>
        <h3 class="font-bold text-sm mb-1">${propertyName}</h3>
        <p class="text-xs text-gray-600 mb-2">${locationText}</p>
        ${floorPlanHTML}
        <a href="/properties/${property.id}" class="block text-xs bg-primary text-primary-foreground py-1 px-2 rounded text-center mt-2 popup-link">
          View Details
        </a>
        <div class="marker-popup-bridge bridge-bottom"></div>
      </div>
    `);
    
  return popup;
};
