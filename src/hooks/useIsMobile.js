import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the device is mobile
 * @param {number} breakpoint - The width breakpoint in pixels (default: 768)
 * @returns {boolean} - True if the device is considered mobile
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    // Check on initial render (SSR-safe)
    if (typeof window !== 'undefined') {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Function to check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Check immediately
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Custom hook to detect mobile device using user agent (more reliable for actual mobile devices)
 * @returns {boolean} - True if the device is a mobile device
 */
export function useIsMobileDevice() {
  const [isMobileDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );
    }
    return false;
  });

  return isMobileDevice;
}

/**
 * Combined hook that checks both screen width and user agent
 * @param {number} breakpoint - The width breakpoint in pixels (default: 768)
 * @returns {object} - Object with isMobile, isMobileDevice, and isMobileScreen properties
 */
export function useMobileDetection(breakpoint = 768) {
  const isMobileScreen = useIsMobile(breakpoint);
  const isMobileDevice = useIsMobileDevice();

  return {
    isMobile: isMobileScreen || isMobileDevice,
    isMobileScreen,
    isMobileDevice
  };
}
