import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Map, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthButtons } from './AuthButtons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Properties', path: '/properties' },
    { name: 'Map View', path: '/map', icon: <Map size={16} className="ml-1" /> }
  ];
  
  if (isLoggedIn) {
    navLinks.push({ 
      name: 'Saved', 
      path: '/saved', 
      icon: <Heart size={16} className="ml-1" fill="currentColor" /> 
    });
  }
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header className="w-full bg-white border-b border-border/40 sticky top-0 z-30">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-serif text-xl md:text-2xl font-bold text-primary">
            Senior Luxury Living
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary py-1'
                    : 'text-foreground/80 hover:text-primary py-1 border-b-2 border-transparent'
                }`}
              >
                {link.name}
                {link.icon}
              </Link>
            ))}
            <AuthButtons />
          </nav>
          
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border/40 absolute w-full z-20 shadow-md">
          <nav className="container-custom py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center text-sm font-medium py-3 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
                {link.icon}
              </Link>
            ))}
            <div className="pt-2 border-t border-border/40 mt-2">
              <AuthButtons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
