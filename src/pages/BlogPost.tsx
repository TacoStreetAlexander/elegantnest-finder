
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost as BlogPostType } from '@/data/blogData';
import useBlogPosts from '@/hooks/useBlogPosts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeft, User2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ResponsiveImage from '@/components/ResponsiveImage';

// Import a markdown parser library (you may need to install this)
// For example: npm install react-markdown
// import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  // Use the blog posts hook at the top level
  const { 
    getPostBySlug, 
    getRelatedPosts, 
    isLoading: isLoadingPosts 
  } = useBlogPosts();
  
  // Use a ref to track if we've loaded the post to prevent infinite loops
  const hasLoadedPost = React.useRef(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Only load the post once to prevent infinite loops
    if (!hasLoadedPost.current && !isLoadingPosts) {
      // Find the post with the matching slug
      const foundPost = getPostBySlug(slug || '');
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts
        const related = getRelatedPosts(foundPost, 3);
        setRelatedPosts(related);
      } else {
        // If post not found, redirect to blog index
        navigate('/blog');
      }
      
      // Mark as loaded
      hasLoadedPost.current = true;
    }
  }, [slug, navigate, isLoadingPosts, getPostBySlug, getRelatedPosts]);

  if (!post || isLoadingPosts) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container-custom py-12">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back to blog link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to all articles
          </Link>
          
          {/* Article header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon size={16} />
                <span>{post.publishDate}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="aspect-[2/1] w-full overflow-hidden rounded-lg mb-8">
              <ResponsiveImage 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </header>
          
          {/* Article content */}
          <article className="prose prose-lg max-w-none">
            {/* If you're using react-markdown: */}
            {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
            
            {/* Simple alternative using dangerouslySetInnerHTML */}
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                  .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                  .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
                  .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
                  .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\n/g, '<br />')
              }} 
            />
          </article>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-serif font-semibold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group">
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video relative overflow-hidden">
                        <ResponsiveImage 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="w-full h-full"
                          objectFit="cover"
                          sizes="(max-width: 768px) 33vw, 300px"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <CalendarIcon size={14} />
                          <span>{relatedPost.publishDate}</span>
                        </div>
                        <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Call to action */}
          <div className="mt-16 bg-muted rounded-lg p-8 text-center">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              Looking for the perfect senior living community?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Explore our curated selection of luxury senior living communities across Texas.
            </p>
            <Button asChild size="lg">
              <Link to="/properties">Browse Communities</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
