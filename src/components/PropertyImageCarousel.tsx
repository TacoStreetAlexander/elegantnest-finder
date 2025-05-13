
import { Property } from '../types/property';
import ResponsiveImage from './ResponsiveImage';

interface PropertyImageCarouselProps {
  properties: Property[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const PropertyImageCarousel = ({ properties, activeIndex, setActiveIndex }: PropertyImageCarouselProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={`
            absolute inset-0 transition-all duration-700 ease-in-out
            ${index === activeIndex ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 -translate-x-8 z-0'}
          `}
        >
          <ResponsiveImage 
            src={property.images[0]} 
            alt={property.name}
            className="w-full h-[400px] md:h-[500px]" 
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={index === activeIndex}
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex 
                ? 'bg-gold scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`View property ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImageCarousel;
