
import { useState, useCallback, useRef } from 'react';

export const usePropertySelection = () => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const listingRef = useRef<HTMLDivElement>(null);
  
  // Handle property selection from map
  const handlePropertySelect = useCallback((id: number) => {
    setSelectedProperty(prevId => prevId === id ? null : id);
    
    // Find and scroll to the selected property card
    setTimeout(() => {
      if (listingRef.current) {
        const element = document.getElementById(`property-card-${id}`);
        if (element) {
          const containerTop = listingRef.current.getBoundingClientRect().top;
          const elementTop = element.getBoundingClientRect().top;
          
          listingRef.current.scrollTo({
            top: listingRef.current.scrollTop + (elementTop - containerTop) - 20,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }, []);

  return {
    selectedProperty,
    listingRef,
    handlePropertySelect
  };
};
