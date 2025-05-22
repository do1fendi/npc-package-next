import React, { useRef, useState, useEffect, createContext, useContext, useMemo } from "react";

/**
 * Carousel
 * @param speed - optional default 0.3
 * @param auto - optional boolean for auto slide
 * @param interval - optional default 3000
 * @usage wrap element &lt;Carousel ref={ref}&gt;{your element}&lt;/Carousel&gt;
 */

interface iProps {
  children: React.ReactNode;
  speed?: number;
  auto?: boolean;
  interval?: number;
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

export function Carousel({ children, speed = 0.3, auto, interval = 3000 }: iProps) {
  const [index, setIndex] = useState(1); // Start at 1 because of prepended clone
  const [isJump, setIsJump] = useState(false);
  const [isTransitioning, setIsTranstioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
  }, [index, speed, totalSlides]);

  useEffect(() => {
    setIsTranstioning(true);
    const timer = setTimeout(() => {
      setIsTranstioning(false);
    }, speed * 1000);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    // if Interval is set
    if (auto) {
      const interVal = setInterval(() => {
        slideRight();
      }, interval);
      return () => clearInterval(interVal);
    }
  }, [auto]);

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
        {/* <div
          style={{
            width: `${(totalSlides + 2) * 100}%`, // +2 for clones
            height: "100%",
            display: "flex",
            transform: `translateX(-${index * (100 / (totalSlides + 2))}%)`,
            transition: isJump ? "none" : `transform ${speed}s ease`,
          }}
        >
         
          <div style={{ width: `${100 / (totalSlides + 2)}%`, flexShrink: 0 }}>{childrenArray[totalSlides - 1]}</div>

      
          {childrenArray.map((child, i) => (
            <div key={i} style={{ width: `${100 / (totalSlides + 2)}%`, flexShrink: 0 }}>
              {child}
            </div>
          ))}

        
          <div style={{ width: `${100 / (totalSlides + 2)}%`, flexShrink: 0 }}>{childrenArray[0]}</div>
        </div> */}

        {/* Navigation buttons */}
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

Carousel.LeftButton = function LeftButton({ children }: { children: React.ReactNode }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
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

Carousel.RightButton = function RightButton({ children }: { children: React.ReactNode }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
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

Carousel.Bullet = function Bullet() {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;

  const slides = Array.from({ length: ctx.totalSlides }, (_, i) => i);
  const index = ctx.index;

  return (
    <div
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
