"use client";
import { useState, useEffect, useRef } from "react";

interface iProps {
  threshold: number;
  rootMargin: string;
}

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

