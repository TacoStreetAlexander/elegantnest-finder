
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/blog.css';
import { preconnectToDomains, monitorResourceLoading } from './utils/performanceOptimization';

// Preconnect to external domains for faster resource loading
preconnectToDomains([
  'https://api.mapbox.com',
  'https://events.mapbox.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://supabase.co'
]);

// Monitor for slow-loading resources in development
const stopMonitoring = monitorResourceLoading();

// Create root and render app
const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(<App />);

// Clean up performance monitoring when the app is unmounted
window.addEventListener('beforeunload', () => {
  stopMonitoring();
});
