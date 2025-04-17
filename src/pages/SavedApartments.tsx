import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SavedPropertyCard from '@/components/SavedPropertyCard';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SavedApartments = () => {
  const { isLoggedIn, userId } = useAuth();
  const { savedPropertyIds } = useSavedProperties();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!isLoggedIn || !userId || savedPropertyIds.length === 0) {
        setSavedProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Query saved properties with a join to get full property details
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
          // Transform the data to match the Property type
          const properties: Property[] = data.map(item => {
            const propertyData = item["Senior Draft 3"];
            return {
              id: propertyData.id,
              name: propertyData.name || 'Unnamed Property',
              city: propertyData.city || '',
              address: propertyData.address || '',
              state: propertyData.state || '',
              zipCode: propertyData.zipCode?.toString() || '',
              metroRegion: propertyData.metroregion || undefined,
              propertyType: 'Senior Apartments', // Default type
              priceRange: {
                min: parseInt(propertyData["1brstart"] || '0'),
                max: parseInt(propertyData["2brstart"] || '0')
              },
              bedrooms: 1, // Default value
              bathrooms: 1, // Default value
              squareFeet: 0, // Default value
              description: propertyData.seo_description || '',
              shortDescription: propertyData.headline || '',
              amenities: propertyData.amenities ? propertyData.amenities.split(',').map(a => a.trim()) : [],
              features: [],
              images: ['/placeholder.svg'], // Default placeholder image
              floorPlans: [
                {
                  name: '1 Bedroom',
                  bedrooms: 1,
                  bathrooms: 1,
                  squareFeet: 0,
                  image: '/placeholder.svg',
                  price: parseInt(propertyData["1brstart"] || '0')
                },
                {
                  name: '2 Bedroom',
                  bedrooms: 2,
                  bathrooms: 2,
                  squareFeet: 0,
                  image: '/placeholder.svg',
                  price: parseInt(propertyData["2brstart"] || '0')
                }
              ],
              availability: 'Available',
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
  }, [isLoggedIn, userId, savedPropertyIds]);

  // Empty state when user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              My Favorite Apartments
            </h1>
          </div>
        </section>
        <div className="container-custom py-12">
          <div className="text-center py-16">
            <h3 className="text-2xl font-serif mb-4">Please log in to view your saved apartments</h3>
            <p className="text-muted-foreground mb-6">You need to be logged in to save and view your favorite apartments.</p>
            <Link to="/properties">
              <Button className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listings
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              My Favorite Apartments
            </h1>
          </div>
        </section>
        <div className="container-custom py-12">
          <div className="text-center py-16">
            <h3 className="text-2xl font-serif mb-4">Loading your saved apartments...</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            My Favorite Apartments
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            View and manage your saved properties.
          </p>
        </div>
      </section>
      
      <div className="container-custom py-12">
        <div className="mb-6">
          <Link to="/properties">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Button>
          </Link>
        </div>
        
        {savedProperties.length === 0 ? (
          <div className="text-center py-16 bg-secondary/10 rounded-lg">
            <h3 className="text-2xl font-serif mb-4">You haven't saved any apartments yet</h3>
            <p className="text-muted-foreground mb-6">Start browsing to find your favorites!</p>
            <Link to="/properties">
              <Button>Browse Apartments</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <SavedPropertyCard 
                  key={property.id} 
                  property={property} 
                  onUnsave={() => {
                    // Remove the property from the local state to update UI immediately
                    setSavedProperties(savedProperties.filter(p => p.id !== property.id));
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SavedApartments;
