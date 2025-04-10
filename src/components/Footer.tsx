
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal-dark text-white/80">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold text-white">Elegant<span className="text-gold">Nest</span></span>
            </Link>
            <p className="mb-6 text-white/70">
              Connecting seniors with luxury living spaces that provide comfort, community, and care across Texas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Find Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-gold transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Senior Living Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Locations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/austin" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Austin
                </Link>
              </li>
              <li>
                <Link to="/dallas" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Dallas
                </Link>
              </li>
              <li>
                <Link to="/houston" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Houston
                </Link>
              </li>
              <li>
                <Link to="/san-antonio" className="text-white/70 hover:text-gold transition-colors inline-block">
                  San Antonio
                </Link>
              </li>
              <li>
                <Link to="/fort-worth" className="text-white/70 hover:text-gold transition-colors inline-block">
                  Fort Worth
                </Link>
              </li>
              <li>
                <Link to="/all-locations" className="text-white/70 hover:text-gold transition-colors inline-block">
                  All Locations
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gold mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+18005551234" className="text-white/70 hover:text-gold transition-colors">
                    (800) 555-1234
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gold mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@elegantnest.com" className="text-white/70 hover:text-gold transition-colors">
                    info@elegantnest.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gold mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Main Office</p>
                  <address className="text-white/70 not-italic">
                    123 Luxury Lane, Suite 400<br />
                    Austin, TX 78701
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ElegantNest. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <Link to="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="hover:text-gold transition-colors">
              Accessibility
            </Link>
            <Link to="/sitemap" className="hover:text-gold transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
