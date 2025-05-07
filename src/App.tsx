
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import MapView from './pages/MapView';
import Auth from './pages/Auth';
import SavedApartments from './pages/SavedApartments';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { PropertyFiltersProvider } from './hooks/usePropertyFilters';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <Router>
      <PropertyFiltersProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/saved" element={<SavedApartments />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </PropertyFiltersProvider>
    </Router>
  );
}

export default App;
