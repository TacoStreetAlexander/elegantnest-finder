
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Property } from '../types/property';
import { propertyData } from '../data/propertyData';
import { fetchFeaturedProperties } from '@/utils/propertyQueries';
import PropertyCarousel from './Properties/PropertyCarousel';
import PropertyLoadingSkeleton from './Properties/PropertyLoadingSkeleton';

const EmbeddedListings = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        const properties = await fetchFeaturedProperties();
        
        if (properties && properties.length > 0) {
          setFeaturedProperties(properties);
        } else {
          // Fallback to static data if no data returned
          setFeaturedProperties(propertyData
            .filter(property => property.featured)
            .slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
        
        // Fallback to static data on error
        setFeaturedProperties(propertyData
          .filter(property => property.featured)
          .slice(0, 6));
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-secondary/20">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Browse Our Luxury Listings
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Loading properties...
            </p>
          </div>
          
          <PropertyLoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Rendering error state:', error);
  }

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Browse Our Luxury Listings
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive directory of premium senior living communities across Texas.
          </p>
        </div>
        
        <div className="mb-8">
          <PropertyCarousel properties={featuredProperties} />
        </div>
        
        <div className="text-center">
          <Link 
            to="/properties" 
            className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-1"
          >
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmbeddedListings;
