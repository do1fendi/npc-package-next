// src/UseInViewport.tsx
import { useState, useEffect, useRef } from "react";
var useInViewport = (props) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);
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
  return [ref, isIntersecting];
};
export {
  useInViewport
};
