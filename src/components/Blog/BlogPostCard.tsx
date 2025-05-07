
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/utils/blogQueries';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          {formattedDate}
        </div>

        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <Button asChild variant="ghost" className="p-0 h-auto font-normal">
          <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary">
            Read More <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
