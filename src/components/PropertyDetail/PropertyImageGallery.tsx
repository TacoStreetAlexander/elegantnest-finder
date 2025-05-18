
import { Property } from '@/types/property';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ResponsiveImage from '@/components/ResponsiveImage';

interface PropertyImageGalleryProps {
  property: Property;
}

const PropertyImageGallery = ({ property }: PropertyImageGalleryProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Carousel className="w-full">
        <CarouselContent>
          {property.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[16/9]">
                <ResponsiveImage
                  src={image}
                  alt={`${property.name} - Image ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  objectFit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default PropertyImageGallery;
