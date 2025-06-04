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
import React, { useRef as useRef2, useState as useState2, useEffect as useEffect2, createContext, useContext } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var CarouselContext = createContext(null);
function Carousel({ children, speed = 0.3, auto, interval = 3e3, slidesToShow = 1 }) {
  const [index, setIndex] = useState2(1);
  const [isJump, setIsJump] = useState2(false);
  const [isTransitioning, setIsTransitioning] = useState2(false);
  const [resetAutoOnBtnClick, setResetAutoOnBtnClick] = useState2(false);
  const ref = useRef2(null);
  const sliderChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Carousel.Slider
  );
  const totalSlides = sliderChild ? Math.ceil(React.Children.count(sliderChild.props.children) / slidesToShow) : 0;
  const prevSlide = () => {
    setResetAutoOnBtnClick(true);
    setIsJump(false);
    setIndex((prev) => prev - 1);
  };
  const nextSlide = () => {
    setResetAutoOnBtnClick(true);
    setIsJump(false);
    setIndex((prev) => prev + 1);
  };
  useEffect2(() => {
    if (index === 0) {
      const timer2 = setTimeout(() => {
        setIsJump(true);
        setIndex(totalSlides);
      }, speed * 1e3);
      return () => clearTimeout(timer2);
    }
    if (index === totalSlides + 1) {
      const timer2 = setTimeout(() => {
        setIsJump(true);
        setIndex(1);
      }, speed * 1e3);
      return () => clearTimeout(timer2);
    }
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, speed * 1e3);
    return () => clearTimeout(timer);
  }, [index, speed, totalSlides]);
  useEffect2(() => {
    if (!auto) return;
    if (!resetAutoOnBtnClick) return;
    const pauseTimeout = setTimeout(() => {
      setResetAutoOnBtnClick(false);
    }, 4e3);
    return () => clearTimeout(pauseTimeout);
  }, [auto, resetAutoOnBtnClick]);
  useEffect2(() => {
    if (!auto || resetAutoOnBtnClick) return;
    const interVal = setInterval(() => {
      setIsJump(false);
      setIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(interVal);
  }, [auto, interval, resetAutoOnBtnClick]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: { prevSlide, nextSlide, isTransitioning, totalSlides, index, isJump, speed, setIndex, slidesToShow },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          style: {
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden"
          },
          children: React.Children.map(
            children,
            (child, i) => React.isValidElement(child) ? /* @__PURE__ */ jsx(React.Fragment, { children: child }, i) : null
          )
        }
      )
    }
  );
}
Carousel.Slider = function Slider({ children }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  const childrenArray = React.Children.toArray(children);
  const groupedSlides = [];
  for (let i = 0; i < childrenArray.length; i += ctx.slidesToShow) {
    groupedSlides.push(childrenArray.slice(i, i + ctx.slidesToShow));
  }
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
        /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0, display: "flex" }, children: groupedSlides[ctx.totalSlides - 1].map((slide, i) => /* @__PURE__ */ jsx("div", { style: { width: `${100 / ctx.slidesToShow}%`, flexShrink: 0 }, children: slide }, i)) }),
        groupedSlides.map((group, i) => /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0, display: "flex" }, children: group.map((slide, i2) => /* @__PURE__ */ jsx("div", { style: { width: `${100 / ctx.slidesToShow}%`, flexShrink: 0 }, children: slide }, i2)) }, i)),
        /* @__PURE__ */ jsx("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0, display: "flex" }, children: groupedSlides[0].map((slide, i) => /* @__PURE__ */ jsx("div", { style: { width: `${100 / ctx.slidesToShow}%`, flexShrink: 0 }, children: slide }, i)) })
      ]
    }
  );
};
Carousel.LeftButton = function LeftButton({ children, className }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className,
      onClick: ctx.prevSlide,
      disabled: ctx.isTransitioning,
      "aria-label": "Previous slide",
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
Carousel.RightButton = function RightButton({ children, className }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className,
      onClick: ctx.nextSlide,
      disabled: ctx.isTransitioning,
      "aria-label": "Next slide",
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
Carousel.Bullet = function Bullet({ className }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  const slides = Array.from({ length: ctx.totalSlides }, (_, i) => i);
  const index = ctx.index;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className,
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
        "button",
        {
          onClick: () => ctx.setIndex(i + 1),
          "aria-label": `Go to slide ${i + 1}`,
          style: {
            border: "solid thin #ccc",
            width: i === index - 1 ? "13px" : "10px",
            height: i === index - 1 ? "13px" : "10px",
            borderRadius: "50%",
            display: "inline-block",
            cursor: "pointer",
            backgroundColor: i === index - 1 ? "#666" : "transparent"
          }
        },
        i
      ))
    }
  );
};

// src/Modal.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ModalContext = createContext2({
  children: null,
  isOpen: false,
  onClose: () => {
  }
});
function Modal({ children, className, isOpen = false, onClose }) {
  return /* @__PURE__ */ jsx2(ModalContext.Provider, { value: { children, isOpen, onClose }, children: /* @__PURE__ */ jsx2(
    "div",
    {
      style: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        visibility: isOpen ? "visible" : "hidden"
      },
      children: /* @__PURE__ */ jsx2(
        "div",
        {
          className,
          style: {
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
          },
          children
        }
      )
    }
  ) });
}
Modal.Header = ({ children, className }) => {
  const ctx = useContext2(ModalContext);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className,
      style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "50px" },
      children: [
        /* @__PURE__ */ jsx2("div", { children }),
        /* @__PURE__ */ jsx2("button", { style: { cursor: "pointer" }, onClick: ctx.onClose, children: "X" })
      ]
    }
  );
};
Modal.Body = ({ children, className }) => {
  return /* @__PURE__ */ jsx2("div", { className, children });
};
Modal.Footer = ({ children, className }) => {
  return /* @__PURE__ */ jsx2("div", { className, children });
};

// src/Accordion.tsx
import { createContext as createContext3, useState as useState3, useContext as useContext3, useRef as useRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var AccordionContext = createContext3({
  openId: null,
  setOpenId: () => {
  }
});
function Accordion({ children, className }) {
  const [openId, setOpenId] = useState3(null);
  return /* @__PURE__ */ jsx3(AccordionContext.Provider, { value: { openId, setOpenId }, children: /* @__PURE__ */ jsx3("div", { className, children }) });
}
var AccordionItemContext = createContext3(null);
var AccordionItem = ({ children, className }) => {
  const id = useRef3(Math.random().toString(36).substr(2, 9)).current;
  return /* @__PURE__ */ jsx3(AccordionItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx3("div", { className, children }) });
};
var AccordionItemHeader = ({ children, className }) => {
  const { openId, setOpenId } = useContext3(AccordionContext);
  const itemContext = useContext3(AccordionItemContext);
  const id = itemContext?.id ?? "";
  const handleClick = () => {
    setOpenId(openId === id ? null : id);
  };
  return /* @__PURE__ */ jsx3("div", { className, onClick: handleClick, children });
};
var AccordionItemBody = ({ children, className, height = 500 }) => {
  const { openId } = useContext3(AccordionContext);
  const itemContext = useContext3(AccordionItemContext);
  const id = itemContext?.id ?? "";
  const isOpen = openId === id;
  return /* @__PURE__ */ jsx3("div", { className, style: { maxHeight: isOpen ? height : "0px", overflow: "hidden" }, children });
};
Accordion.Item = AccordionItem;
Accordion.Item.Header = AccordionItemHeader;
Accordion.Item.Body = AccordionItemBody;
export {
  Accordion,
  Carousel,
  Modal,
  useInViewport
};
