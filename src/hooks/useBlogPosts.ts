import { useState, useEffect, useMemo } from 'react';
import { blogPosts, BlogPost } from '@/data/blogData';

interface UseBlogPostsOptions {
  featured?: boolean;
  tag?: string;
  limit?: number;
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getRelatedPosts: (post: BlogPost, limit?: number) => BlogPost[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to manage blog posts
 * 
 * This hook provides functions to fetch and filter blog posts.
 * It's designed to be easily swappable with a real API in the future.
 */
export function useBlogPosts(options: UseBlogPostsOptions = {}): UseBlogPostsReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Fetch posts (currently from mock data, but could be from an API in the future)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Filter posts based on options
        let filteredPosts = [...blogPosts];
        
        if (options.featured !== undefined) {
          filteredPosts = filteredPosts.filter(post => 
            options.featured ? post.featured : !post.featured
          );
        }
        
        if (options.tag) {
          filteredPosts = filteredPosts.filter(post => 
            post.tags.includes(options.tag!)
          );
        }
        
        if (options.limit) {
          filteredPosts = filteredPosts.slice(0, options.limit);
        }
        
        setPosts(filteredPosts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [options.featured, options.tag, options.limit]);

  // Memoize featured posts
  const featuredPosts = useMemo(() => {
    return blogPosts.filter(post => post.featured);
  }, []);

  // Function to get a post by slug
  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
  };

  // Function to get related posts based on tags
  const getRelatedPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
    return blogPosts
      .filter(p => 
        p.id !== post.id && 
        p.tags.some(tag => post.tags.includes(tag))
      )
      .slice(0, limit);
  };

  return {
    posts,
    featuredPosts,
    getPostBySlug,
    getRelatedPosts,
    isLoading,
    error
  };
}

export default useBlogPosts;
