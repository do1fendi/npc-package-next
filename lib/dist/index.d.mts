import * as React from 'react';
import React__default from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface iProps$1 {
    threshold: number;
    rootMargin: string;
}
/**
 * Check element is in viewport
 * @param threshold - example treshold 0.25
 * @param rootMargin - "80% 0px -20% 0px"
 * @returns Boolean true or false
 * @usage set const - const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });
 * @usage wrap element &lt;div ref={ref}&gt;{your element}&lt;/div&gt;
 */
declare const useInViewport: (props: iProps$1) => readonly [React.RefObject<HTMLDivElement | null>, boolean];

/**
 * Carousel
 * @param speed - optional default 0.3
 * @param auto - optional boolean for auto slide
 * @param interval - optional default 3000
 * @usage wrap element &lt;Carousel ref={ref}&gt;{your element}&lt;/Carousel&gt;
 */
interface iProps {
    children: React__default.ReactNode;
    speed?: number;
    auto?: boolean;
    interval?: number;
}
declare function Carousel({ children, speed, auto, interval }: iProps): react_jsx_runtime.JSX.Element;
declare namespace Carousel {
    var Slider: ({ children }: {
        children: React__default.ReactNode;
    }) => react_jsx_runtime.JSX.Element | null;
    var LeftButton: ({ children }: {
        children: React__default.ReactNode;
    }) => react_jsx_runtime.JSX.Element | null;
    var RightButton: ({ children }: {
        children: React__default.ReactNode;
    }) => react_jsx_runtime.JSX.Element | null;
    var Bullet: () => react_jsx_runtime.JSX.Element | null;
}

export { Carousel, useInViewport };
