
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const SavedPropertiesHeader = () => {
  return (
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
  );
};
