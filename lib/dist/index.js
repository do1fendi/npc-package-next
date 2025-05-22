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
  Carousel: () => Carousel,
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
  const ref = (0, import_react2.useRef)(null);
  const childrenArray = import_react2.default.Children.toArray(children);
  const childrenArrays = (0, import_react2.useMemo)(() => import_react2.default.Children.toArray(children), [children]);
  const totalSlides = childrenArrays.length + 1;
  const slideLeft = () => {
    console.log("left");
    setIsJump(false);
    setIndex((prev) => prev - 1);
  };
  const slideRight = () => {
    setIsJump(false);
    setIndex((prev) => prev + 1);
  };
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    setIsTranstioning(true);
    const timer = setTimeout(() => {
      setIsTranstioning(false);
    }, speed * 1e3);
    return () => clearTimeout(timer);
  }, [index]);
  (0, import_react2.useEffect)(() => {
    if (auto) {
      const interVal = setInterval(() => {
        slideRight();
      }, interval);
      return () => clearInterval(interVal);
    }
  }, [auto]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContext.Provider, { value: { slideLeft, slideRight, isTransitioning, totalSlides, index, isJump, speed }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        (child, i) => import_react2.default.isValidElement(child) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.default.Fragment, { children: child }, i) : null
      )
    }
  ) });
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
Carousel.LeftButton = function LeftButton({ children }) {
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const ctx = (0, import_react2.useContext)(CarouselContext);
  if (!ctx) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Carousel,
  useInViewport
});
