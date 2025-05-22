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

// src/Carousel.tsx
import React, { useRef as useRef2, useState as useState2, useEffect as useEffect2, createContext, useContext, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var CarouselContext = createContext(null);
function Carousel({ children, speed = 0.3, auto, interval = 3e3 }) {
  const [index, setIndex] = useState2(1);
  const [isJump, setIsJump] = useState2(false);
  const [isTransitioning, setIsTranstioning] = useState2(false);
  const ref = useRef2(null);
  const childrenArray = React.Children.toArray(children);
  const childrenArrays = useMemo(() => React.Children.toArray(children), [children]);
  const totalSlides = childrenArrays.length;
  const slideLeft = () => {
    console.log("left");
    setIsJump(false);
    setIndex((prev) => prev - 1);
  };
  const slideRight = () => {
    setIsJump(false);
    setIndex((prev) => prev + 1);
  };
  useEffect2(() => {
    if (index === 0) {
      const timer = setTimeout(() => {
        setIsJump(true);
        setIndex(totalSlides);
      }, speed * 1e3);
      return () => clearTimeout(timer);
    }
    if (index === totalSlides + 1) {
      const timer = setTimeout(() => {
        setIsJump(true);
        setIndex(1);
      }, speed * 1e3);
      return () => clearTimeout(timer);
    }
  }, [index, speed, totalSlides]);
  useEffect2(() => {
    setIsTranstioning(true);
    const timer = setTimeout(() => {
      setIsTranstioning(false);
    }, speed * 1e3);
    return () => clearTimeout(timer);
  }, [index]);
  useEffect2(() => {
    if (auto) {
      const interVal = setInterval(() => {
        slideRight();
      }, interval);
      return () => clearInterval(interVal);
    }
  }, [auto]);
  return /* @__PURE__ */ jsx(CarouselContext.Provider, { value: { slideLeft, slideRight, isTransitioning, totalSlides, index, isJump, speed }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden"
      },
      children: childrenArray.map(
        (child, i) => React.isValidElement(child) ? /* @__PURE__ */ jsx(React.Fragment, { children: child }, i) : null
      )
    }
  ) });
}
Carousel.Slider = function Slider({ children }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  const childrenArray = React.Children.toArray(children);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: `${(ctx.totalSlides + 2) * 100}%`,
        // +2 for clones
        height: "100%",
        display: "flex",
        transform: `translateX(-${ctx.index * (100 / (ctx.totalSlides + 2))}%)`,
        transition: ctx.isJump ? "none" : `transform ${ctx.speed}s ease`
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: childrenArray[ctx.totalSlides - 1] }),
        childrenArray.map((child, i) => /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: child }, i)),
        /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: childrenArray[0] })
      ]
    }
  );
};
Carousel.LeftButton = function LeftButton({ children }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: ctx.slideLeft,
      disabled: ctx.isTransitioning,
      style: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "20px",
        zIndex: 1
      },
      children: children || "\u2190"
    }
  );
};
Carousel.RightButton = function RightButton({ children }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: ctx.slideRight,
      disabled: ctx.isTransitioning,
      style: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "20px",
        zIndex: 1
      },
      children: children || "\u2192"
    }
  );
};
Carousel.Bullet = function Bullet() {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  const slides = Array.from({ length: ctx.totalSlides }, (_, i) => i);
  const index = ctx.index;
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "20px",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        gap: "5px"
      },
      children: slides.map((slide, i) => /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            border: "solid thin #ccc",
            width: i === index - 1 ? "13px" : "10px",
            height: i === index - 1 ? "13px" : "10px",
            borderRadius: "50%",
            display: "inline-block"
          }
        },
        i
      ))
    }
  );
};
export {
  Carousel,
  useInViewport
};
