
// Types for map initialization options
export interface MapOptions {
  style?: string;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  pitch?: number;
  bearing?: number;
  projection?: string;
  interactive?: boolean;
  attributionControl?: boolean;
  customMapboxToken?: string;
}
