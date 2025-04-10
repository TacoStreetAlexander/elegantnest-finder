
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Info, Users, Clock, HeartHandshake, MapPin, Award } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              About <span className="text-gradient">ElegantNest</span>
            </h1>
            <p className="text-lg md:text-xl text-charcoal/80 mb-8">
              Dedicated to enhancing the lives of seniors across Texas through exceptional living environments.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Empowering seniors to live with dignity and joy
              </h2>
              <p className="text-charcoal/80 text-lg mb-6">
                At ElegantNest, we believe that your golden years should be lived with dignity, comfort, and joy. Our mission is to empower older adults to find housing solutions that enhance their quality of life and provide peace of mind for their families.
              </p>
              <p className="text-charcoal/80 text-lg">
                We understand that finding the right senior living community is a significant decision. That's why we're committed to providing personalized guidance, transparent information, and unwavering support throughout your journey.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Senior couple enjoying their luxury apartment" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-cream-lighter">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The principles that guide us
            </h2>
            <p className="text-charcoal/80 text-lg">
              These core values define who we are and how we approach our mission of helping seniors find their perfect home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <Info className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Transparency</h3>
              <p className="text-charcoal/80">We believe in honest, clear communication about all aspects of senior living options.</p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <HeartHandshake className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Compassion</h3>
              <p className="text-charcoal/80">We approach every interaction with empathy, understanding the emotional aspects of this transition.</p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <Users className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Family Focus</h3>
              <p className="text-charcoal/80">We consider both the needs of seniors and their families throughout the process.</p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <Clock className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Respect</h3>
              <p className="text-charcoal/80">We honor the dignity, preferences, and individuality of every senior we serve.</p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <Award className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Excellence</h3>
              <p className="text-charcoal/80">We strive for the highest standards in every recommendation and service we provide.</p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <div className="mb-6">
                <MapPin className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Local Expertise</h3>
              <p className="text-charcoal/80">Our deep knowledge of Texas communities ensures we find the perfect location for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Meet the people behind ElegantNest
            </h2>
            <p className="text-charcoal/80 text-lg">
              Our team of compassionate professionals is dedicated to helping seniors and their families navigate the journey to finding the perfect home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-6 mx-auto rounded-full overflow-hidden w-48 h-48 border-4 border-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Emily Thompson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-1">Emily Thompson</h3>
              <p className="text-gold mb-3">Founder & CEO</p>
              <p className="text-charcoal/80">
                With over 15 years of experience in senior care, Emily founded ElegantNest with a vision to transform how seniors find their ideal living spaces.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-6 mx-auto rounded-full overflow-hidden w-48 h-48 border-4 border-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80" 
                  alt="Michael Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-1">Michael Rodriguez</h3>
              <p className="text-gold mb-3">Senior Housing Specialist</p>
              <p className="text-charcoal/80">
                Michael's background in real estate and gerontology gives him unique insight into creating perfect matches between seniors and communities.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-6 mx-auto rounded-full overflow-hidden w-48 h-48 border-4 border-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-gold mb-3">Family Support Coordinator</p>
              <p className="text-charcoal/80">
                With a background in social work, Sarah ensures families receive the emotional support they need during the transition process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gold/10 to-cream-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to find your perfect senior living community?
          </h2>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto mb-8">
            Let us guide you through the process of finding a luxury senior living community that meets your unique needs and preferences.
          </p>
          <a href="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Us Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
