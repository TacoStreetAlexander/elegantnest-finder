
import { ArrowRight, Headphones, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const CallToAction = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section relative bg-charcoal text-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#d4af37" d="M42.8,-73.2C56.1,-67.3,68.2,-58.2,75.3,-46C82.4,-33.7,84.6,-16.9,83.8,-0.4C83.1,16,79.4,32,71.9,46.4C64.4,60.8,53,73.6,39.2,79.1C25.4,84.5,9.1,82.7,-5.8,79.2C-20.8,75.8,-34.5,70.7,-46.8,62.6C-59.1,54.5,-70,43.3,-77.7,29.3C-85.4,15.3,-89.9,-1.5,-86.5,-16.7C-83.1,-31.8,-71.8,-45.2,-58.8,-52.3C-45.8,-59.4,-31,-60.1,-18.5,-65.7C-5.9,-71.3,4.5,-81.9,17.1,-85C29.7,-88.1,44.8,-83.8,42.8,-73.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={inView ? 'animate-fade-in' : 'opacity-0'}>
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold-light text-sm mb-6">
              Personalized Guidance
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Let Us Help You Find Your Perfect Home
            </h2>
            
            <p className="text-white/80 mb-8 text-lg">
              Our experienced advisors are ready to guide you through every step of the process, from exploring options to moving in. We're committed to finding the perfect home that meets your unique needs and preferences.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gold/20">
                  <Headphones className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Free Consultation</h3>
                  <p className="text-white/70 text-sm">Personalized guidance tailored to your needs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gold/20">
                  <MessageCircle className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">24/7 Support</h3>
                  <p className="text-white/70 text-sm">Always available to answer your questions</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary bg-gold hover:bg-gold-dark text-white">
                Contact an Advisor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <a href="tel:+18005551234" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gold text-gold hover:bg-gold/10 px-6 py-3">
                Call (800) 555-1234
              </a>
            </div>
          </div>
          
          <div className={`p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-serif font-bold mb-6">Request Information</h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Jane"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="jane.smith@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">Preferred Location</label>
                <select 
                  id="location" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select a city</option>
                  <option value="austin">Austin</option>
                  <option value="dallas">Dallas</option>
                  <option value="houston">Houston</option>
                  <option value="san-antonio">San Antonio</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Additional Information</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Tell us about your specific needs or questions..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-primary bg-gold hover:bg-gold-dark text-white"
              >
                Submit Request
              </button>
              
              <p className="text-xs text-white/60 text-center">
                By submitting this form, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link> and consent to be contacted regarding senior living options.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
