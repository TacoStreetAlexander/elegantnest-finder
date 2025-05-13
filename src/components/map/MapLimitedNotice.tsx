import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface MapLimitedNoticeProps {
  total: number;
  shown: number;
}

const MapLimitedNotice = ({ total, shown }: MapLimitedNoticeProps) => {
  if (total <= shown) return null;
  
  return (
    <Alert variant="destructive" className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-white/95 shadow-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Limited Map View</AlertTitle>
      <AlertDescription>
        Showing {shown} of {total} properties for better performance. 
        Apply filters to see more specific results.
      </AlertDescription>
    </Alert>
  );
};

export default MapLimitedNotice;
