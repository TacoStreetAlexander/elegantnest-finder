
/**
 * Validates that latitude and longitude values are within valid ranges
 */
export const isValidCoordinate = (lat: number, lng: number): boolean => {
  return !isNaN(lat) && !isNaN(lng) && 
         lat >= -90 && lat <= 90 && 
         lng >= -180 && lng <= 180 &&
         lat !== 0 && lng !== 0; // Consider 0,0 as invalid (likely missing data)
};
