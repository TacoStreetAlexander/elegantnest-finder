
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import SaveButton from './SaveButton';
import ResponsiveImage from './ResponsiveImage';

interface FeaturedPropertyCardProps {
  property: Property;
  isActive: boolean;
}

const FeaturedPropertyCard = ({ property, isActive }: FeaturedPropertyCardProps) => {
  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isActive ? 'block animate-fade-in-right' : 'hidden'
      }`}
    >
      <div className="mb-2">
        <span className="flex items-center text-sm font-medium text-gold">
          <MapPin size={16} className="mr-1" />
          {property.city}, {property.state}
        </span>
      </div>
      <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">{property.name}</h3>
      
      <div className="flex items-center mb-6">
        <div className="flex items-center text-gold mr-4">
          <Star size={20} className="fill-gold" />
          <span className="ml-1 font-medium">4.9</span>
        </div>
        <span className="text-charcoal/60 text-sm">({Math.floor(Math.random() * 50) + 20} reviews)</span>
      </div>
      
      <p className="text-xl font-medium mb-6 text-gold">Starting at ${property.priceRange.min.toLocaleString()}/month</p>
      
      <div className="mb-8">
        <h4 className="text-sm uppercase tracking-wider mb-3 text-charcoal/70">Featured Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {property.amenities.map((amenity, i) => (
            <span key={i} className="px-3 py-1 bg-cream rounded-full text-sm">
              {amenity}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <Link to={`/properties/${property.id}`} className="btn-primary">
          View Details
        </Link>
        <SaveButton propertyId={property.id} />
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
