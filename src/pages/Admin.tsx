
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom py-12">
          <Alert variant="destructive">
            <Shield className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this page. Please contact an administrator if you believe this is a mistake.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-custom py-12">
        <h1 className="text-3xl font-serif font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-6">
          {/* Add admin features here */}
          <p className="text-muted-foreground">Welcome to the admin dashboard.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
