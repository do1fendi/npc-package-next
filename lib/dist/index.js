"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  Carousel: () => Carousel,
  Modal: () => Modal,
  useInViewport: () => useInViewport
});
module.exports = __toCommonJS(index_exports);

// src/UseInViewport.tsx
var import_react = require("react");
var useInViewport = (props) => {
  const [isIntersecting, setIntersecting] = (0, import_react.useState)(false);
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
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
var import_react2 = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var CarouselContext = (0, import_react2.createContext)(null);
function Carousel({ children, speed = 0.3, auto, interval = 3e3 }) {
  const [index, setIndex] = (0, import_react2.useState)(1);
  const [isJump, setIsJump] = (0, import_react2.useState)(false);
  const [isTransitioning, setIsTranstioning] = (0, import_react2.useState)(false);
  const [resetAutoOnBtnClick, setResetAutoOnBtnClick] = (0, import_react2.useState)(false);
  const ref = (0, import_react2.useRef)(null);
  const childrenArrays = (0, import_react2.useMemo)(() => import_react2.default.Children.toArray(children), [children]);
  const totalSlides = childrenArrays.length;
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
  (0, import_react2.useEffect)(() => {
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
    setIsTranstioning(true);
    const timer = setTimeout(() => {
      setIsTranstioning(false);
    }, speed * 1e3);
    return () => clearTimeout(timer);
  }, [index, speed, totalSlides]);
  (0, import_react2.useEffect)(() => {
    if (!auto) return;
    if (!resetAutoOnBtnClick) return;
    const pauseTimeout = setTimeout(() => {
      setResetAutoOnBtnClick(false);
    }, 4e3);
    return () => clearTimeout(pauseTimeout);
  }, [auto, resetAutoOnBtnClick]);
  (0, import_react2.useEffect)(() => {
    if (!auto || resetAutoOnBtnClick) return;
    const interVal = setInterval(() => {
      setIsJump(false);
      setIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(interVal);
  }, [auto, interval, resetAutoOnBtnClick]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    CarouselContext.Provider,
    {
      value: { prevSlide, nextSlide, isTransitioning, totalSlides, index, isJump, speed, setIndex },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref,
          style: {
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden"
          },
          children: childrenArrays.map(
            (child, i) => import_react2.default.isValidElement(child) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.default.Fragment, { children: child }, i) : null
          )
        }
      )
    }
  );
}
Carousel.Slider = function Slider({ children }) {
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  const childrenArray = import_react2.default.Children.toArray(children);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: childrenArray[ctx.totalSlides - 1] }),
        childrenArray.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: child }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }, children: childrenArray[0] })
      ]
    }
  );
};
Carousel.LeftButton = function LeftButton({ children, className }) {
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  const slides = Array.from({ length: ctx.totalSlides }, (_, i) => i);
  const index = ctx.index;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: slides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            cursor: "pointer"
          }
        },
        i
      ))
    }
  );
};

// src/Modal.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ModalContext = (0, import_react3.createContext)({
  children: null,
  isOpen: false,
  onClose: () => {
  }
});
function Modal({ children, className, isOpen = false, onClose }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ModalContext.Provider, { value: { children, isOpen, onClose }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  const ctx = (0, import_react3.useContext)(ModalContext);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className,
      style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "50px" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { style: { cursor: "pointer" }, onClick: ctx.onClose, children: "X" })
      ]
    }
  );
};
Modal.Body = ({ children, className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className, children });
};
Modal.Footer = ({ children, className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className, children });
};

// src/Accordion.tsx
var import_react4 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var AccordionContext = (0, import_react4.createContext)({
  openId: null,
  setOpenId: () => {
  }
});
function Accordion({ children, className }) {
  const [openId, setOpenId] = (0, import_react4.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AccordionContext.Provider, { value: { openId, setOpenId }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, children }) });
}
var AccordionItemContext = (0, import_react4.createContext)(null);
var AccordionItem = ({ children, className }) => {
  const id = (0, import_react4.useRef)(Math.random().toString(36).substr(2, 9)).current;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AccordionItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, children }) });
};
var AccordionItemHeader = ({ children, className }) => {
  const { openId, setOpenId } = (0, import_react4.useContext)(AccordionContext);
  const itemContext = (0, import_react4.useContext)(AccordionItemContext);
  const id = itemContext?.id ?? "";
  const handleClick = () => {
    setOpenId(openId === id ? null : id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, onClick: handleClick, children });
};
var AccordionItemBody = ({ children, className, height = 500 }) => {
  const { openId } = (0, import_react4.useContext)(AccordionContext);
  const itemContext = (0, import_react4.useContext)(AccordionItemContext);
  const id = itemContext?.id ?? "";
  const isOpen = openId === id;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, style: { maxHeight: isOpen ? height : "0px", overflow: "hidden" }, children });
};
Accordion.Item = AccordionItem;
Accordion.Item.Header = AccordionItemHeader;
Accordion.Item.Body = AccordionItemBody;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  Carousel,
  Modal,
  useInViewport
});
