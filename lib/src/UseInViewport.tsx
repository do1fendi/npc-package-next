"use client";
import { useState, useEffect, useRef } from "react";

interface iProps {
  threshold: number;
  rootMargin: string;
}

/**
 * Check element is in viewport
 * @param threshold - example treshold 0.25
 * @param rootMargin - "80% 0px -20% 0px"
 * @returns Boolean true or false
 * @usage  
 * ```tsx 
 * const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" }); 
 * 
 * <div ref={ref} style={{backgroundColor: isIntersecting ? "green" : "red"}}>Hello World</div>
 * ```
 
 */

export const useInViewport = (props: iProps) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

 
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { ...props }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [props]);

  return [ref, isIntersecting] as const;
};

