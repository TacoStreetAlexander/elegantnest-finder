import { useEffect, useState } from 'react';

/**
 * Component that monitors and displays performance metrics
 * Only shown in development mode or when explicitly enabled
 */
const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<{
    fps: number;
    memory?: number;
    loadTime: number;
  }>({
    fps: 0,
    memory: undefined,
    loadTime: 0
  });
  
  useEffect(() => {
    // Only run in development or if explicitly enabled
    if (process.env.NODE_ENV !== 'development' && 
        !localStorage.getItem('showPerformanceMonitor')) {
      return;
    }
    
    setIsVisible(true);
    
    // Calculate page load time
    const loadTime = 
      window.performance.timing.domContentLoadedEventEnd - 
      window.performance.timing.navigationStart;
    
    // Set initial metrics
    setMetrics(prev => ({
      ...prev,
      loadTime
    }));
    
    // FPS calculation
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      
      // Update FPS every second
      if (now - lastTime > 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;
        
        // Get memory usage if available
        const memory = (performance as any).memory?.usedJSHeapSize / (1024 * 1024);
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: memory ? Math.round(memory) : undefined
        }));
      }
      
      requestAnimationFrame(calculateFps);
    };
    
    const frameId = requestAnimationFrame(calculateFps);
    
    // Toggle visibility with keyboard shortcut (Alt+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      <div>FPS: {metrics.fps}</div>
      {metrics.memory !== undefined && (
        <div>Memory: {metrics.memory} MB</div>
      )}
      <div>Load: {metrics.loadTime}ms</div>
    </div>
  );
};

export default PerformanceMonitor;
