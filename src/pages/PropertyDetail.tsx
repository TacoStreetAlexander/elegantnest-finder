
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { fetchPropertyBySlug } from '@/utils/propertyQueries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  PropertyHeader,
  PropertyImageGallery,
  PropertyQuickInfo,
  PropertyTabs,
  PropertyLoadingState,
  PropertyNotFound
} from '@/components/PropertyDetail';

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Fetch property data
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', slug],
    queryFn: () => fetchPropertyBySlug(slug || ''),
    enabled: !!slug,
    meta: {
      onError: (err: Error) => {
        console.error('Error loading property:', err);
        toast({
          title: 'Error',
          description: 'Unable to load property details. Please try again.',
          variant: 'destructive',
        });
      }
    }
  });
  
  // Handle 404 - property not found
  useEffect(() => {
    if (!isLoading && !property && !error) {
      toast({
        title: 'Property Not Found',
        description: 'The property you are looking for does not exist or has been removed.',
        variant: 'destructive',
      });
      
      // Redirect to properties page after 3 seconds
      const timeout = setTimeout(() => {
        navigate('/properties');
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isLoading, property, error, navigate]);
  
  // Loading state
  if (isLoading) {
    return <PropertyLoadingState />;
  }
  
  // Error or property not found state
  if (!property) {
    return <PropertyNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PropertyHeader property={property} />
      
      <div className="container-custom py-8">
        <PropertyImageGallery property={property} />
        
        <PropertyQuickInfo property={property} />
        
        <PropertyTabs property={property} />
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
