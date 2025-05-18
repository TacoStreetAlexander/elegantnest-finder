
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PropertyLoadingState = () => {
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
};

export default PropertyLoadingState;
