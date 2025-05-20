import * as react from 'react';

interface iProps {
    threshold: number;
    rootMargin: string;
}
/**
 * Check element is in viewport
 * @param threshold - example treshold 0.25
 * @param rootMargin - "80% 0 -20% 0"
 * @returns Boolean true or false
 * @usage set const - const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });
 * @usage wrap element &lt;div ref={ref}&gt;{your element}&lt;/div&gt;
 */
declare const useInViewport: (props: iProps) => readonly [react.RefObject<HTMLDivElement | null>, boolean];

export { useInViewport };
