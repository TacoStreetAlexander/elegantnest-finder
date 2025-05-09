import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useBlogPosts from '@/hooks/useBlogPosts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, User2 } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Use the blog posts hook
  const { featuredPosts, posts: allPosts, isLoading } = useBlogPosts();
  
  // Get non-featured posts
  const regularPosts = allPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Senior Living Blog</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Insights, advice, and resources for seniors and their families
          </p>
          
          {/* Loading state */}
          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : (
            <>
              {/* Featured Posts Section */}
              {featuredPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-serif font-semibold mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-gold text-white text-xs px-3 py-1 rounded">
                          Featured
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <CalendarIcon size={14} />
                          <span>{post.publishDate}</span>
                        </div>
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
              {/* All Posts Section */}
              <section>
            <h2 className="text-2xl font-serif font-semibold mb-6">All Articles</h2>
            <div className="grid gap-8">
              {regularPosts.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                      </div>
                      <CardContent className="p-5 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <CalendarIcon size={14} />
                            <span>{post.publishDate}</span>
                          </div>
                          <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <img 
                              src={post.author.avatar} 
                              alt={post.author.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium">{post.author.name}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                            {post.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="font-normal">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
              </section>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
