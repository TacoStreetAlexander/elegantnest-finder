
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchBlogPostBySlug, BlogPost } from '@/utils/blogQueries';
import MarkdownRenderer from '@/components/Blog/MarkdownRenderer';
import { BlogPostDetailSkeleton } from '@/components/Blog/BlogLoadingSkeleton';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        navigate('/blog');
        return;
      }

      setIsLoading(true);
      const blogPost = await fetchBlogPostBySlug(slug);
      
      if (!blogPost) {
        navigate('/blog');
        return;
      }
      
      setPost(blogPost);
      setIsLoading(false);
    };

    loadPost();
  }, [slug, navigate]);

  if (isLoading) {
    return <BlogPostDetailSkeleton />;
  }

  if (!post) {
    return null;
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Estimate reading time (average reading speed: 200 words per minute)
  const wordCount = post.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Helmet>
        <title>{post.seo_title || post.title} | Senior Luxury Living</title>
        <meta 
          name="description" 
          content={post.seo_description || post.excerpt} 
        />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta property="og:description" content={post.seo_description || post.excerpt} />
        <meta property="og:image" content={post.cover_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo_title || post.title} />
        <meta name="twitter:description" content={post.seo_description || post.excerpt} />
        <meta name="twitter:image" content={post.cover_image} />
      </Helmet>

      <article className="container-custom py-12">
        <div className="mb-8">
          <Button 
            asChild 
            variant="ghost" 
            size="sm" 
            className="mb-4"
          >
            <Link to="/blog" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm mb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {readingTime} min read
            </div>
          </div>

          <div className="aspect-[21/9] overflow-hidden rounded-lg mb-8">
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.body} />
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
