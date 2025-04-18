import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FeaturedProperties from '../components/FeaturedProperties';
import EmbeddedListings from '../components/EmbeddedListings';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedProperties />
      <EmbeddedListings />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
