
import { MapOptions } from '../../types/map';

// Default map options
export const getDefaultMapOptions = (options?: MapOptions): MapOptions => {
  return {
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-97.7431, 30.2672], // Default to Austin, TX
    zoom: 10,
    minZoom: 2,
    maxZoom: 18,
    pitch: 0,
    bearing: 0,
    interactive: true,
    attributionControl: true,
    ...options
  };
};
