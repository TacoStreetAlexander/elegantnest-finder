
import mapboxgl from 'mapbox-gl';

/**
 * Creates marker clusters for the map when needed
 */
export const createMarkerClusters = (map: mapboxgl.Map) => {
  // Make sure the map is fully loaded before trying to add sources
  if (!map) {
    console.warn('Map not provided when trying to create clusters');
    return;
  }
  
  // Check if the map is ready for operations
  if (!map.loaded()) {
    console.warn('Map not fully loaded when trying to create clusters');
    return;
  }
  
  try {
    // Check if the 'clusters' source already exists
    if (map.getSource('clusters')) {
      console.log('Cluster source already exists');
      return;
    }
    
    // Add cluster source - with try/catch to prevent runtime errors
    try {
      map.addSource('clusters', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });
    } catch (err) {
      console.error('Error adding cluster source:', err);
      return;
    }
    
    // Add cluster layers if they don't exist
    if (!map.getLayer('clusters')) {
      try {
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'clusters',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#8B5CF6',
              10, '#F97316',
              30, '#0EA5E9'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              10, 30,
              30, 40
            ]
          }
        });
      } catch (err) {
        console.error('Error adding clusters layer:', err);
      }
    }
    
    if (!map.getLayer('cluster-count')) {
      try {
        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'clusters',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': '#ffffff'
          }
        });
      } catch (err) {
        console.error('Error adding cluster-count layer:', err);
      }
    }
    
    console.log('Successfully created cluster layers');
  } catch (error) {
    console.error('Error creating marker clusters:', error);
  }
};
