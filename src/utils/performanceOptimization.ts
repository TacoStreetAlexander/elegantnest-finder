/**
 * Utility functions for performance optimization
 */

/**
 * Checks if a script is already loaded
 * @param src Script source URL
 * @returns Boolean indicating if script is loaded
 */
export const isScriptLoaded = (src: string): boolean => {
  return document.querySelectorAll(`script[src="${src}"]`).length > 0;
};

/**
 * Loads a script asynchronously with defer
 * @param src Script source URL
 * @param id Optional ID for the script tag
 * @returns Promise that resolves when script is loaded
 */
export const loadScriptAsync = (src: string, id?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded(src)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    if (id) script.id = id;

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.body.appendChild(script);
  });
};

/**
 * Preconnect to external domains to speed up resource loading
 * @param domains Array of domains to preconnect to
 */
export const preconnectToDomains = (domains: string[]): void => {
  domains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Also add DNS prefetch as fallback for browsers that don't support preconnect
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      document.head.appendChild(dnsPrefetch);
    }
  });
};

/**
 * Lazy loads an external resource when it's needed
 * @param resourceLoader Function that loads the resource
 * @param options Options for lazy loading
 * @returns Function to trigger loading
 */
export const createLazyLoader = (
  resourceLoader: () => Promise<any>,
  options: {
    loadOnVisible?: boolean;
    selector?: string;
    rootMargin?: string;
  } = {}
): () => Promise<any> => {
  let resourcePromise: Promise<any> | null = null;
  
  // Set up intersection observer if needed
  if (options.loadOnVisible && options.selector && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !resourcePromise) {
            resourcePromise = resourceLoader();
          }
        });
      },
      { rootMargin: options.rootMargin || '200px' }
    );
    
    // Observe all matching elements
    document.querySelectorAll(options.selector).forEach(el => {
      observer.observe(el);
    });
  }
  
  // Return function to manually trigger loading
  return () => {
    if (!resourcePromise) {
      resourcePromise = resourceLoader();
    }
    return resourcePromise;
  };
};

/**
 * Detects slow-loading resources and logs them
 * @returns Function to stop monitoring
 */
export const monitorResourceLoading = (): () => void => {
  // Only run in development or if explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !window.localStorage.getItem('enablePerfMonitoring')) {
    return () => {}; // No-op in production
  }
  
  const SLOW_THRESHOLD = 1000; // 1 second
  const resourceTiming: Record<string, number> = {};
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        const url = resourceEntry.name;
        const duration = resourceEntry.duration;
        
        if (duration > SLOW_THRESHOLD) {
          console.warn(`Slow resource detected: ${url} (${Math.round(duration)}ms)`);
          resourceTiming[url] = duration;
        }
      }
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
  
  return () => {
    observer.disconnect();
    
    // Log summary of slow resources
    const slowResources = Object.entries(resourceTiming)
      .sort(([, durationA], [, durationB]) => durationB - durationA);
    
    if (slowResources.length > 0) {
      console.group('Slow Resource Summary');
      slowResources.forEach(([url, duration]) => {
        console.log(`${url}: ${Math.round(duration)}ms`);
      });
      console.groupEnd();
    }
  };
};
