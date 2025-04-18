
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const SavedPropertiesEmpty = () => {
  return (
    <div className="container-custom py-12">
      <div className="mb-6">
        <Link to="/properties">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </Link>
      </div>
      <div className="text-center py-16 bg-secondary/10 rounded-lg">
        <h3 className="text-2xl font-serif mb-4">You haven't saved any apartments yet</h3>
        <p className="text-muted-foreground mb-6">Start browsing to find your favorites!</p>
        <Link to="/properties">
          <Button>Browse Apartments</Button>
        </Link>
      </div>
    </div>
  );
};
