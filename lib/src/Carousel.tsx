import React, { useRef, useState, useEffect, createContext, useContext, useMemo } from "react";

interface iProps {
  children: React.ReactNode;
  speed?: number;
  auto?: boolean;
  interval?: number;
}

interface iController {
  children?: React.ReactNode;
  className?: string;
}

const CarouselContext = createContext<{
  slideLeft: () => void;
  slideRight: () => void;
  isTransitioning: boolean;
  totalSlides: number;
  index: number;
  isJump: boolean;
  speed: number;
} | null>(null);

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

export function Carousel({ children, speed = 0.3, auto, interval = 3000 }: iProps) {
  const [index, setIndex] = useState(1); // Start at 1 because of prepended clone
  const [isJump, setIsJump] = useState(false);
  const [isTransitioning, setIsTranstioning] = useState(false);
  const [resetAutoOnBtnClick, setResetAutoOnBtnClick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children);

  const childrenArrays = useMemo(() => React.Children.toArray(children), [children]);
  const totalSlides = childrenArrays.length;

  const slideLeft = () => {
    setResetAutoOnBtnClick(true);
    setIsJump(false);
    setIndex((prev) => prev - 1);
  };

  const slideRight = () => {
    setResetAutoOnBtnClick(true);
    setIsJump(false);
    setIndex((prev) => prev + 1);
  };

  // handle transition and jump
  useEffect(() => {
    if (index === 0) {
      // Jump from first clone to last real slide
      const timer = setTimeout(() => {
        setIsJump(true);
        setIndex(totalSlides);
      }, speed * 1000);
      return () => clearTimeout(timer);
    }

    if (index === totalSlides + 1) {
      // Jump from last clone to first real slide
      const timer = setTimeout(() => {
        setIsJump(true);
        setIndex(1);
      }, speed * 1000);
      return () => clearTimeout(timer);
    }

    // Set transition duration
    setIsTranstioning(true);
    const timer = setTimeout(() => {
      setIsTranstioning(false);
    }, speed * 1000);
    return () => clearTimeout(timer);
  }, [index, speed, totalSlides]);

  // Pause the interval if button is pressed
  useEffect(() => {
    if (!auto) return;
    if (!resetAutoOnBtnClick) return;

    const pauseTimeout = setTimeout(() => {
      setResetAutoOnBtnClick(false);
    }, 4000);

    return () => clearTimeout(pauseTimeout);
  }, [auto, resetAutoOnBtnClick]);

  // Main auto-slide interval
  useEffect(() => {
    if (!auto || resetAutoOnBtnClick) return;

    const interVal = setInterval(() => {
      setIsJump(false);
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(interVal);
  }, [auto, interval, resetAutoOnBtnClick]);

  return (
    <CarouselContext.Provider value={{ slideLeft, slideRight, isTransitioning, totalSlides, index, isJump, speed }}>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Render children including buttons */}
        {childrenArray.map((child, i) =>
          React.isValidElement(child) ? <React.Fragment key={i}>{child}</React.Fragment> : null
        )}
      </div>
    </CarouselContext.Provider>
  );
}

Carousel.Slider = function Slider({ children }: { children: React.ReactNode }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      style={{
        width: `${(ctx.totalSlides + 2) * 100}%`, // +2 for clones
        height: "100%",
        display: "flex",
        transform: `translateX(-${ctx.index * (100 / (ctx.totalSlides + 2))}%)`,
        transition: ctx.isJump ? "none" : `transform ${ctx.speed}s ease`,
      }}
    >
      {/* Clone of last */}
      <div style={{ width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }}>
        {childrenArray[ctx.totalSlides - 1]}
      </div>

      {/* Real slides */}
      {childrenArray.map((child, i) => (
        <div key={i} style={{ width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }}>
          {child}
        </div>
      ))}

      {/* Clone of first */}
      <div style={{ width: `${100 / (ctx.totalSlides + 2)}%`, flexShrink: 0 }}>{childrenArray[0]}</div>
    </div>
  );
};

Carousel.LeftButton = function LeftButton({ children, className }: iController) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
      className={className}
      onClick={ctx.slideLeft}
      disabled={ctx.isTransitioning}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "20px",
        zIndex: 1,
      }}
    >
      {children || "←"}
    </button>
  );
};

Carousel.RightButton = function RightButton({ children, className }: iController) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
      className={className}
      onClick={ctx.slideRight}
      disabled={ctx.isTransitioning}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "20px",
        zIndex: 1,
      }}
    >
      {children || "→"}
    </button>
  );
};

Carousel.Bullet = function Bullet({ className }: iController) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;

  const slides = Array.from({ length: ctx.totalSlides }, (_, i) => i);
  const index = ctx.index;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "20px",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {slides.map((slide, i) => (
        <span
          key={i}
          style={{
            border: "solid thin #ccc",
            width: i === index - 1 ? "13px" : "10px",
            height: i === index - 1 ? "13px" : "10px",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      ))}
    </div>
  );
};
