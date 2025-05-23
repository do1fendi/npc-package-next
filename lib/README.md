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