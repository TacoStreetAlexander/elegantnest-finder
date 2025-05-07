
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen } from 'lucide-react';
import { fetchAllBlogPosts, BlogPost } from '@/utils/blogQueries';
import BlogPostCard from '@/components/Blog/BlogPostCard';
import { BlogIndexSkeleton } from '@/components/Blog/BlogLoadingSkeleton';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const blogPosts = await fetchAllBlogPosts();
      setPosts(blogPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <BlogIndexSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Blog | Senior Luxury Living</title>
        <meta 
          name="description" 
          content="Explore articles about senior living options, retirement planning, health and wellness for older adults, and more." 
        />
      </Helmet>

      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-3xl font-serif font-bold">Our Blog</h1>
          </div>
          <p className="text-muted-foreground">
            Insights, guides, and resources for senior living and retirement planning
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No blog posts found</h2>
            <p className="text-muted-foreground">
              Check back soon for new articles and insights.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
