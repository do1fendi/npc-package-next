import * as React from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface iProps$3 {
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
declare const useInViewport: (props: iProps$3) => readonly [React.RefObject<HTMLDivElement | null>, boolean];

interface iProps$2 {
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
 * @example
 * ```tsx
 * <div className="w-[300px] h-[300px] rounded overflow-hidden">
        <Carousel speed={0.4} auto>
          <Carousel.LeftButton className="text-xl cursor-pointer">Left</Carousel.LeftButton>
          <Carousel.RightButton>Right</Carousel.RightButton>
          <Carousel.Bullet />
          <Carousel.Slider>
            <div className="w-full h-full bg-pink-200">0</div>
            <div className="w-full h-full bg-pink-400">1</div>
            <div className="w-full h-full bg-pink-600">2</div>
            <div className="w-full h-full bg-pink-800">3</div>
          </Carousel.Slider>
        </Carousel>
      </div>
 * ```
 */
declare function Carousel({ children, speed, auto, interval }: iProps$2): react_jsx_runtime.JSX.Element;
declare namespace Carousel {
    var Slider: ({ children }: {
        children: React__default.ReactNode;
    }) => react_jsx_runtime.JSX.Element | null;
    var LeftButton: ({ children, className }: iController) => react_jsx_runtime.JSX.Element | null;
    var RightButton: ({ children, className }: iController) => react_jsx_runtime.JSX.Element | null;
    var Bullet: ({ className }: iController) => react_jsx_runtime.JSX.Element | null;
}

interface iProps$1 {
    children: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}
/**
 * Modal
 * @param isOpen - state for open modal
 * @param onClose - function for close modal
 * @example
 * ```tsx
 * <Modal isOpen={boolean} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>
 *     <h1 className="w-full h-full bg-pink-200">Header</h1>
 *   </Modal.Header>
 *   <Modal.Body>
 *     <p className="w-full h-full bg-pink-200">Body content</p>
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <button className="w-full h-full bg-pink-200">Footer button</button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
declare function Modal({ children, className, isOpen, onClose }: iProps$1): react_jsx_runtime.JSX.Element;
declare namespace Modal {
    var Header: ({ children, className }: iChildrenProps) => react_jsx_runtime.JSX.Element;
    var Body: ({ children, className }: iChildrenProps) => react_jsx_runtime.JSX.Element;
    var Footer: ({ children, className }: iChildrenProps) => react_jsx_runtime.JSX.Element;
}
interface iChildrenProps {
    children: ReactNode;
    className?: string;
}

interface iProps {
    children: ReactNode;
    className?: string;
}
/**
 * Accordion
 * @example
 * ```tsx
 * <Accordion>
        <Accordion.Item>
          <Accordion.Item.Header>
            <h1>Accordion Item Header 1</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body>
            <p>Body content 1</p>
          </Accordion.Item.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header>
            <h1>Accordion Item Header 2</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body>
            <p>Body content 2</p>
          </Accordion.Item.Body>
        </Accordion.Item>
      </Accordion>
 * ```
 */
declare function Accordion({ children, className }: iProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var Item: (({ children, className }: iProps) => react_jsx_runtime.JSX.Element) & {
        Header: typeof AccordionItemHeader;
        Body: typeof AccordionItemBody;
    };
}
declare const AccordionItemHeader: ({ children, className }: iProps) => react_jsx_runtime.JSX.Element;
declare const AccordionItemBody: ({ children, className }: iProps) => react_jsx_runtime.JSX.Element;

export { Accordion, Carousel, Modal, useInViewport };
