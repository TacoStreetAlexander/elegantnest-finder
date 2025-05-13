
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getWebPUrl, generateSrcSet, getResponsiveSizes, getPlaceholderImage } from '@/utils/imageOptimization';

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
}

/**
 * ResponsiveImage component that handles:
 * - Lazy loading
 * - Responsive sizing
 * - Loading states with blur placeholders
 */
const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  className,
  imgClassName,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Get WebP version of the image
  const imageSrc = getWebPUrl(src);
  
  // Generate srcset for responsive images
  const srcSet = generateSrcSet(src);
  
  // Get appropriate sizes attribute
  const sizesAttr = sizes || getResponsiveSizes();
  
  // Get placeholder for blur-up effect
  const placeholder = getPlaceholderImage();
  
  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error
  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
    >
      {/* Placeholder or loading state */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-secondary/30 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Main image with lazy loading */}
      <img
        src={imageSrc}
        srcSet={srcSet || undefined}
        sizes={sizesAttr}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          error ? "hidden" : "block",
          imgClassName
        )}
        style={{
          objectFit,
          objectPosition,
          width: '100%',
          height: '100%'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 text-muted-foreground">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
