
import { create } from 'zustand';

interface PropertyFiltersState {
  metroRegion: string;
  selectedBedrooms: string[];
  priceRange: [number, number];
  selectedAmenities: string[];
  showSavedOnly: boolean;
  setMetroRegion: (region: string) => void;
  setSelectedBedrooms: (bedrooms: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedAmenities: (amenities: string[]) => void;
  setShowSavedOnly: (show: boolean) => void;
  clearFilters: () => void;
}

export const usePropertyFilters = create<PropertyFiltersState>((set) => ({
  metroRegion: 'all-regions',
  selectedBedrooms: [],
  priceRange: [0, 10000],
  selectedAmenities: [],
  showSavedOnly: false,
  setMetroRegion: (region) => set({ metroRegion: region }),
  setSelectedBedrooms: (bedrooms) => set({ selectedBedrooms: bedrooms }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSelectedAmenities: (amenities) => set({ selectedAmenities: amenities }),
  setShowSavedOnly: (show) => set({ showSavedOnly: show }),
  clearFilters: () => set({
    metroRegion: 'all-regions',
    selectedBedrooms: [],
    priceRange: [0, 10000],
    selectedAmenities: [],
    showSavedOnly: false
  })
}));
