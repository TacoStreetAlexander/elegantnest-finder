
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { fetchPropertyBySlug } from '@/utils/propertyQueries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bed, Bath, Home, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import SaveButton from '@/components/SaveButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
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
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container-custom py-16">
          <div className="w-full h-64 animate-pulse bg-gray-200 rounded-lg"></div>
          <div className="mt-8 w-3/4 h-10 animate-pulse bg-gray-200 rounded-md"></div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 animate-pulse bg-gray-200 rounded-md"></div>
            <div className="h-40 animate-pulse bg-gray-200 rounded-md"></div>
            <div className="h-40 animate-pulse bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Error or property not found state
  if (!property) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container-custom py-16 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Property Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The property you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate('/properties')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Property Detail Header */}
      <div className="bg-secondary/30 py-8">
        <div className="container-custom">
          <button 
            onClick={() => navigate('/properties')}
            className="flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold">{property.name}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <SaveButton propertyId={property.id} className="text-sm" />
              {property.website && (
                <Button variant="default" asChild>
                  <a href={property.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Image Gallery */}
      <div className="container-custom py-8">
        <div className="relative overflow-hidden rounded-lg">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[16/9]">
                    <img
                      src={image}
                      alt={`${property.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gold" />
                <span className="text-xl font-semibold">
                  ${property.priceRange.min.toLocaleString()} - ${property.priceRange.max.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Starting price for available units</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Property Type</h3>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-gold" />
                <span className="text-xl font-semibold">{property.propertyType}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {property.availability} • Built in {property.yearBuilt}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Contact Info</h3>
              <div className="space-y-2">
                <p className="font-medium">{property.contactInfo.phone}</p>
                <p className="text-sm text-muted-foreground">{property.contactInfo.email}</p>
                {property.petFriendly && (
                  <p className="text-sm mt-2">
                    <span className="bg-gold/10 text-gold px-2 py-1 rounded-full text-xs">
                      Pet Friendly
                    </span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="floorplans">Floor Plans</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-serif font-semibold mb-4">About {property.name}</h2>
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{property.shortDescription}</p>
                  <p>{property.description}</p>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {property.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{property.metroRegion}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">{property.availability}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-muted-foreground">Pet Policy</span>
                    <span className="font-medium">{property.petFriendly ? 'Pet Friendly' : 'No Pets Allowed'}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Floor Plans Tab */}
          <TabsContent value="floorplans" className="mt-8">
            <h2 className="text-2xl font-serif font-semibold mb-6">Available Floor Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {property.floorPlans.map((plan, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                    <div className="flex items-center gap-x-4 text-sm mb-3">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{plan.bedrooms} Bed</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{plan.bathrooms} Bath</span>
                      </div>
                      <div>
                        <span>{plan.squareFeet} sq ft</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg">${plan.price.toLocaleString()}</div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Amenities Tab */}
          <TabsContent value="amenities" className="mt-8">
            <h2 className="text-2xl font-serif font-semibold mb-6">Amenities & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center py-2 border-b">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            
            <Accordion type="single" collapsible className="mt-12">
              <AccordionItem value="contactinfo">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Phone:</strong> {property.contactInfo.phone}</p>
                    <p><strong>Email:</strong> {property.contactInfo.email}</p>
                    {property.website && (
                      <p>
                        <strong>Website:</strong>{' '}
                        <a 
                          href={property.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gold hover:underline"
                        >
                          {property.website}
                        </a>
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="location">
                <AccordionTrigger>Location & Directions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Address:</strong> {property.address}</p>
                    <p><strong>City:</strong> {property.city}</p>
                    <p><strong>State:</strong> {property.state}</p>
                    <p><strong>Zip Code:</strong> {property.zipCode}</p>
                    <p><strong>Region:</strong> {property.metroRegion}</p>
                    <Button variant="outline" className="mt-4" size="sm">
                      <MapPin className="mr-2 h-4 w-4" /> View on Map
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
