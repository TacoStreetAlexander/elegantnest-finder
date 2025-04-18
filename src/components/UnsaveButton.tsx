
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import { toast } from '@/components/ui/use-toast';

interface UnsaveButtonProps {
  propertyId: number;
  className?: string;
  onUnsave?: () => void;
}

const UnsaveButton = ({ propertyId, className = '', onUnsave }: UnsaveButtonProps) => {
  const { toggleSaveProperty } = useSavedProperties();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUnsaveClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling
    
    setIsLoading(true);
    
    try {
      const result = await toggleSaveProperty(propertyId);
      
      if (!result.success) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // Show success toast
        toast({
          title: "Property Unsaved",
          description: result.message,
          variant: "default",
        });
        
        // Call the onUnsave callback if provided
        if (onUnsave) {
          onUnsave();
        }
      }
    } catch (error) {
      console.error('Error unsaving property:', error);
      toast({
        title: "Error",
        description: "Failed to unsave property. Please try again.",
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
      onClick={handleUnsaveClick}
      disabled={isLoading}
    >
      <span className="flex items-center gap-1">
        <span className="text-lg">💖</span> Unsave
      </span>
    </Button>
  );
};

export default UnsaveButton;
