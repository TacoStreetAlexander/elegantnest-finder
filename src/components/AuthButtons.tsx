
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export function AuthButtons() {
  const { isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <Link to="/auth">
        <Button variant="ghost" size="sm" className="h-8">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8" 
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
