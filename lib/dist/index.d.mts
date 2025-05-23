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

interface iProps {
    children: React__default.ReactNode;
    speed?: number;
    auto?: boolean;
    interval?: number;
}
interface iController {
    children?: React__default.ReactNode;
    className?: string;
}
/**
 * Carousel
 * @param speed - optional default 0.3
 * @param auto - optional boolean for auto slide
 * @param interval - optional default 3000
 * @usage wrap element &lt;Carousel ref={ref}&gt;{your element}&lt;/Carousel&gt;
 * @usage &lt;div className="w-[300px] h-[300px] rounded overflow-hidden"&gt;
        &lt;Carousel speed={1.2} auto&gt;
          &lt;Carousel.LeftButton className="text-xl cursor-pointer"&gt;Left&lt;/Carousel.LeftButton&gt;
          &lt;Carousel.RightButton&gt;Right&lt;/Carousel.RightButton&gt;
          &lt;Carousel.Bullet /&gt;
          &lt;Carousel.Slider&gt;
            &lt;div className="w-full h-full bg-pink-200"&gt;0&lt;/div&gt;
            &lt;div className="w-full h-full bg-pink-400"&gt;1&lt;/div&gt;
            &lt;div className="w-full h-full bg-pink-600"&gt;2&lt;/div&gt;
            &lt;div className="w-full h-full bg-pink-800"&gt;3&lt;/div&gt;
          &lt;/Carousel.Slider&gt;
        &lt;/Carousel&gt;
 */
declare function Carousel({ children, speed, auto, interval }: iProps): react_jsx_runtime.JSX.Element;
declare namespace Carousel {
    var Slider: ({ children }: {
        children: React__default.ReactNode;
    }) => react_jsx_runtime.JSX.Element | null;
    var LeftButton: ({ children, className }: iController) => react_jsx_runtime.JSX.Element | null;
    var RightButton: ({ children, className }: iController) => react_jsx_runtime.JSX.Element | null;
    var Bullet: ({ className }: iController) => react_jsx_runtime.JSX.Element | null;
}

export { Carousel, useInViewport };
