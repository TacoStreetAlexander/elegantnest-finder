
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  body: string;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

export const fetchAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
    
    return data as BlogPost[];
  } catch (error: any) {
    console.error('Exception in fetchAllBlogPosts:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch blog posts.',
      variant: 'destructive'
    });
    return [];
  }
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    if (!slug) {
      console.error('Invalid slug provided:', slug);
      return null;
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching blog post by slug:', error);
      throw error;
    }
    
    if (!data) {
      console.warn(`No blog post found with slug: ${slug}`);
      return null;
    }
    
    return data as BlogPost;
  } catch (error: any) {
    console.error(`Exception in fetchBlogPostBySlug for slug ${slug}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to fetch blog post.',
      variant: 'destructive'
    });
    return null;
  }
};
