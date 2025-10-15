"use client";

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Measure Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          } else if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEntry & { processingStart: number };
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          } else if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as PerformanceEntry & { value: number }).value);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

      // Measure page load time
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null;
}