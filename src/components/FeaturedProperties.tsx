
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedProperties } from '../utils/propertyQueries';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import PropertyImageCarousel from './PropertyImageCarousel';
import { FeaturedPropertiesLoading, FeaturedPropertiesEmpty } from './FeaturedPropertiesStates';

const FeaturedProperties = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch featured properties from Supabase
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching featured properties:', err);
      }
    }
  });

  useEffect(() => {
    if (properties.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [properties.length]);

  // Fallback content for loading state
  if (isLoading) {
    return <FeaturedPropertiesLoading />;
  }

  // If no properties are found, return a message
  if (!properties || properties.length === 0) {
    return <FeaturedPropertiesEmpty />;
  }

  return (
    <section className="section relative bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
            Featured Communities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Discover Exceptional Living Spaces
          </h2>
          <p className="text-charcoal/80 text-lg">
            Explore our handpicked selection of premium senior living communities across Texas.
          </p>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Carousel */}
            <div className="order-2 lg:order-1">
              <PropertyImageCarousel 
                properties={properties} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            </div>

            {/* Property Details */}
            <div className="order-1 lg:order-2">
              {properties.map((property, index) => (
                <FeaturedPropertyCard
                  key={property.id}
                  property={property}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <Link to="/properties" className="inline-flex items-center justify-center text-gold hover:text-gold-dark font-medium">
            View All Available Properties
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
