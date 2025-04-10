
import { useIsMobile } from '@/hooks/use-mobile';

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full h-full rounded-lg border overflow-hidden shadow-md relative ${
      !isMobile ? 'sticky top-4' : ''
    }`}>
      {children}
    </div>
  );
};

export default MapContainer;
