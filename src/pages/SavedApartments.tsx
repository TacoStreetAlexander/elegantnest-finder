
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Property } from '@/types/property';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SavedPropertiesHeader } from '@/components/SavedProperties/SavedPropertiesHeader';
import { SavedPropertiesLoading } from '@/components/SavedProperties/SavedPropertiesLoading';
import { SavedPropertiesEmpty } from '@/components/SavedProperties/SavedPropertiesEmpty';
import { SavedPropertiesGrid } from '@/components/SavedProperties/SavedPropertiesGrid';

const SavedApartments = () => {
  const { isLoggedIn, userId } = useAuth();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!isLoggedIn || !userId) {
        setSavedProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_properties')
          .select(`
            property_id,
            "Senior Draft 3" (*)
          `)
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

        if (data) {
          const properties = data.map(item => {
            const propertyData = item["Senior Draft 3"];
            return {
              id: propertyData.id,
              name: propertyData.name || 'Unnamed Property',
              city: propertyData.city || '',
              address: propertyData.address || '',
              state: propertyData.state || '',
              zipCode: propertyData.zipCode?.toString() || '',
              metroRegion: propertyData.metroregion || undefined,
              propertyType: 'Independent Living' as const, // Fix: Cast to one of the allowed values
              priceRange: {
                min: parseInt(propertyData["1brstart"] || '0'),
                max: parseInt(propertyData["2brstart"] || '0')
              },
              bedrooms: 1,
              bathrooms: 1,
              squareFeet: 0,
              description: propertyData.seo_description || '',
              shortDescription: propertyData.headline || '',
              amenities: propertyData.amenities ? propertyData.amenities.split(',').map(a => a.trim()) : [],
              features: [],
              images: ['/placeholder.svg'],
              floorPlans: [{
                name: '1 Bedroom',
                bedrooms: 1,
                bathrooms: 1,
                squareFeet: 0,
                image: '/placeholder.svg',
                price: parseInt(propertyData["1brstart"] || '0')
              }],
              availability: 'Available' as const, // Fix: Cast to one of the allowed values
              contactInfo: {
                phone: '',
                email: ''
              },
              website: propertyData.website_link || '',
              latitude: propertyData.latitude || 0,
              longitude: propertyData.longitude || 0,
              yearBuilt: 0,
              petFriendly: false,
              featured: false,
              urlSlug: propertyData.url_slug || undefined
            };
          });
          setSavedProperties(properties);
        }
      } catch (error) {
        console.error('Error fetching saved properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [isLoggedIn, userId]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <SavedPropertiesHeader />
        <SavedPropertiesEmpty />
        <Footer />
      </div>
    );
  }

  if (loading) {
    return <SavedPropertiesLoading />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SavedPropertiesHeader />
      {savedProperties.length === 0 ? (
        <SavedPropertiesEmpty />
      ) : (
        <SavedPropertiesGrid 
          properties={savedProperties}
          onUnsave={(propertyId) => {
            setSavedProperties(savedProperties.filter(p => p.id !== propertyId));
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default SavedApartments;
