"use client";
import Image from "next/image";
import { useInViewport } from "@do1fendi/next-lib";

export default function Home() {
  const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });
  return (
    <div className="">
      <div className="h-screen">sdad</div>
      <div ref={ref}>{JSON.stringify(isIntersecting)}</div>
      <div className="h-screen">sdad</div>
    </div>
  );
}
