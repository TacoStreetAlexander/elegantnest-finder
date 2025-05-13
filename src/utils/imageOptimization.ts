/**
 * Utility functions for image optimization
 */

/**
 * Converts an image URL to WebP format if it's not already WebP
 * @param url Original image URL
 * @param quality WebP quality (0-100)
 * @returns URL for WebP version of the image
 */
export const getWebPUrl = (url: string, quality: number = 80): string => {
  // If URL is already WebP, return it
  if (url.toLowerCase().endsWith('.webp')) {
    return url;
  }
  
  // Check if URL is from a CDN that supports WebP conversion
  // This is a placeholder - implement based on your actual CDN
  if (url.includes('cloudinary.com')) {
    // Example Cloudinary WebP transformation
    return url.replace('/upload/', `/upload/q_${quality},f_webp/`);
  }
  
  if (url.includes('imgix.net')) {
    // Example Imgix WebP transformation
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}fm=webp&q=${quality}`;
  }
  
  // For other URLs, we can't convert on-the-fly
  // In a real implementation, you might want to preprocess images server-side
  return url;
};

/**
 * Creates a srcset for responsive images
 * @param url Base image URL
 * @param widths Array of widths to generate srcset for
 * @returns srcset string
 */
export const generateSrcSet = (url: string, widths: number[] = [400, 800, 1200]): string => {
  // If URL is from a CDN that supports dynamic resizing
  if (url.includes('cloudinary.com')) {
    return widths
      .map(width => {
        const resizedUrl = url.replace('/upload/', `/upload/w_${width},q_auto,f_webp/`);
        return `${resizedUrl} ${width}w`;
      })
      .join(', ');
  }
  
  if (url.includes('imgix.net')) {
    return widths
      .map(width => {
        const separator = url.includes('?') ? '&' : '?';
        const resizedUrl = `${url}${separator}w=${width}&fm=webp&q=80`;
        return `${resizedUrl} ${width}w`;
      })
      .join(', ');
  }
  
  // For other URLs, we can't generate a proper srcset
  return '';
};

/**
 * Gets appropriate sizes attribute for responsive images
 * @returns sizes attribute string
 */
export const getResponsiveSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

/**
 * Creates a placeholder image URL for lazy loading
 * @returns Placeholder image URL
 */
export const getPlaceholderImage = (): string => {
  return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 1 1%22%3E%3C%2Fsvg%3E';
};
