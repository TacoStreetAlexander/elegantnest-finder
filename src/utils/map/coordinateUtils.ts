/**
 * Validates that latitude and longitude values are within valid ranges
 * and handles edge cases like undefined, null, or invalid types
 */
export const isValidCoordinate = (lat: any, lng: any): boolean => {
  // Handle undefined, null, or non-numeric values
  if (lat === undefined || lat === null || lng === undefined || lng === null) {
    return false;
  }
  
  // Convert to numbers if they're strings
  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;
  
  // Check if values are valid numbers
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return false;
  }
  
  // Check for NaN values (which can happen after parsing)
  if (isNaN(latitude) || isNaN(longitude)) {
    return false;
  }
  
  // Check if coordinates are within valid ranges
  // and not at 0,0 (which is often a default value for missing data)
  return latitude >= -90 && latitude <= 90 && 
         longitude >= -180 && longitude <= 180 &&
         !(Math.abs(latitude) < 0.0001 && Math.abs(longitude) < 0.0001); // More precise check for "near 0,0"
};
