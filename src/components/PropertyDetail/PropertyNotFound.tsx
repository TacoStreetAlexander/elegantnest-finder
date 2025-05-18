
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PropertyNotFound = () => {
  const navigate = useNavigate();
  
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
};

export default PropertyNotFound;
