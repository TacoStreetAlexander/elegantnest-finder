
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Elegant senior living space with comfortable furniture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 pt-24 pb-12">
        <div className="max-w-2xl">
          <span className={`inline-block px-4 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold-light text-sm mb-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            Luxury Senior Living in Texas
          </span>
          
          <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Find Your Elegant Home for Your Golden Years
          </h1>
          
          <p className={`text-lg md:text-xl text-cream-lighter/90 mb-8 max-w-xl leading-relaxed ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Discover luxury senior apartments that combine elegance, comfort, and community. We help you find the perfect place to call home.
          </p>
          
          <div className={`flex flex-wrap gap-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <Link to="/properties" className="btn-primary bg-gold hover:bg-gold-dark text-white font-medium">
              Explore Properties
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gold bg-transparent text-cream-lighter hover:bg-gold/10 px-6 py-3">
              Get Personalized Help
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
