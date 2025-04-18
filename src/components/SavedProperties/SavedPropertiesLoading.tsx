
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SavedPropertiesHeader } from './SavedPropertiesHeader';

export const SavedPropertiesLoading = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SavedPropertiesHeader />
      <div className="container-custom py-12">
        <div className="text-center py-16">
          <h3 className="text-2xl font-serif mb-4">Loading your saved apartments...</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};
