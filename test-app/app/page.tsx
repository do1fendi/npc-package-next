"use client";
import { useInViewport, Carousel } from "@do1fendi/next-lib";

export default function Home() {
  const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });
  return (
    <div className="">
      {/* <div className="h-screen">sdad</div>
      <div ref={ref}>{JSON.stringify(isIntersecting)}</div>
      <div className="h-screen">sdad</div> */}
      <div className="w-[300px] h-[300px]">
        <Carousel speed={1.2} auto>
          <Carousel.LeftButton>Left</Carousel.LeftButton>
          <Carousel.RightButton>Right</Carousel.RightButton>
          <Carousel.Slider>
            <div className="w-[300px] h-[300px] bg-pink-200">0</div>
            <div className="w-[300px] h-[300px] bg-pink-400">1</div>
            <div className="w-[300px] h-[300px] bg-pink-600">2</div>
            <div className="w-[300px] h-[300px] bg-pink-800">3</div>
          </Carousel.Slider>
        </Carousel>
      </div>
    </div>
  );
}
