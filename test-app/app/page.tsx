"use client";
import { useState } from "react";
import { useInViewport, Carousel, Modal, Accordion } from "@do1fendi/next-lib";

export default function Home() {
  // const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="">
      {/* <div className="h-screen">sdad</div>
      <div ref={ref}>{JSON.stringify(isIntersecting)}</div>
      <div className="h-screen">sdad</div> */}
      <div className="w-[300px] h-[300px] rounded overflow-hidden">
        <Carousel slidesToShow={3}>
          <Carousel.LeftButton className="text-xl cursor-pointer">Left</Carousel.LeftButton>
          <Carousel.RightButton>Right</Carousel.RightButton>
          <Carousel.Bullet />
          <Carousel.Slider>
            <div className="w-full h-full bg-pink-200 flex justify-center items-center text-2xl">0</div>
            <div className="w-full h-full bg-pink-400 flex justify-center items-center text-2xl">1</div>
            <div className="w-full h-full bg-pink-600 flex justify-center items-center text-2xl">2</div>
            <div className="w-full h-full bg-pink-800 flex justify-center items-center text-2xl">3</div>
            <div className="w-full h-full bg-pink-200 flex justify-center items-center text-2xl">4</div>
            <div className="w-full h-full bg-pink-400 flex justify-center items-center text-2xl">5</div>
            <div className="w-full h-full bg-pink-600 flex justify-center items-center text-2xl">6</div>
            <div className="w-full h-full bg-pink-800 flex justify-center items-center text-2xl">7</div>
          </Carousel.Slider>
        </Carousel>
      </div>
      {/* <Modal
        className={`text-gray-700 p-5 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Header className="border-b border-gray-200 pb-5">
          <h1 className="text-xl font-bold">Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Modal Body</p>
        </Modal.Body>
        <Modal.Footer>
          <button>Modal Footer</button>
        </Modal.Footer>
      </Modal>
      <button onClick={() => setIsOpen(true)}>Open Modal</button> */}

      {/* <Accordion className="w-[500px] border border-gray-200 rounded-lg">
        <Accordion.Item>
          <Accordion.Item.Header className="text-xl font-bold cursor-pointer p-2 border-b border-gray-200">
            <h1>Accordion Item Header 1</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body className="transition-all duration-500 ease-in-out px-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
          </Accordion.Item.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header className="text-xl font-bold cursor-pointer p-2 border-b border-gray-200">
            <h1>Accordion Item Header 2</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body className="transition-all duration-500 ease-in-out px-5">
          <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
          </Accordion.Item.Body>
        </Accordion.Item>
      </Accordion> */}
    </div>
  );
}
