
import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
            <PropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </div>
    </Carousel>
  );
};

export default PropertyCarousel;
