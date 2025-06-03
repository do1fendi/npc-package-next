## Installation

```bash
npm run @do1fendi/next-lib
#
```

## Module Carousel

### Example Usage

```
<div className="w-[300px] h-[300px] rounded overflow-hidden">
    <Carousel speed={.4} auto >
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
```

## Module useInViewport

### Example Usage with tailwind

```
const [ref, isIntersecting] = useInViewport({ threshold: 0.25, rootMargin: "50% 0px -50% 0px" });

<div ref={ref}>
    <div className={isIntersecting ? "text-xl" : "text-md"}>This is a text</div>
</div>
```

## Module Modal

### Example Usage with tailwind

```
const [isOpen, setIsOpen] = useState(false);

<Modal
    className={`text-gray-700 p-5 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
    isOpen={isOpen}
    onClose={() => { setIsOpen(false);}}
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
<button onClick={() => setIsOpen(true)}>Open Modal</button>
```

## Module Accordion

### Example Usage with tailwind

```
<Accordion className="w-[500px] border border-gray-200 rounded-lg">
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
</Accordion>
```
