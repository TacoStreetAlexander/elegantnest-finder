import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface SaveButtonProps {
  propertyId: number;
  className?: string;
}

const SaveButton = ({ propertyId, className = '' }: SaveButtonProps) => {
  const { isLoggedIn } = useAuth();
  const { isPropertySaved, toggleSaveProperty } = useSavedProperties();
  const [isLoading, setIsLoading] = useState(false);
  
  const isSaved = isPropertySaved(propertyId);
  
  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling
    
    setIsLoading(true);
    
    try {
      const result = await toggleSaveProperty(propertyId);
      
      if (!result.success) {
        // Show alert if user is not logged in
        if (!isLoggedIn) {
          alert("Please log in to save listings.");
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`px-2 py-1 h-auto ${className}`}
      onClick={handleSaveClick}
      disabled={isLoading}
    >
      {isSaved ? (
        <span className="flex items-center gap-1">
          <span className="text-lg">💖</span> Saved
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <span className="text-lg">🤍</span> Save
        </span>
      )}
    </Button>
  );
};

export default SaveButton;
