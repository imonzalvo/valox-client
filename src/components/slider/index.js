import { useMemo, useState, useCallback, useEffect } from "react";
import tw from "twin.macro";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../productCard";
import { DotButton, NextButton, PrevButton } from "./ArrowsDots";
import { getProductWidthMobile } from "@/helpers/utils";

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const SectionHeading = tw.h2`text-start text-4xl sm:text-5xl font-black tracking-wide text-center xsmall:max-w-[375px]`;
const Header = tw(SectionHeading)``;

export default function Slider({
  products,
  productsByChunk,
  showArrows = true,
  fullWidthProducts = false,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center" });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const productsChunks = useMemo(() => {
    return [...chunks(products, productsByChunk)];
  }, [products, productsByChunk]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {productsChunks.map((productChunk, chunkindex) => {
            return (
              <div className="embla__slide" key={chunkindex}>
                <div className="flex relative wrap flex-row justify-center">
                  {productChunk.map((product) => {
                    return (
                      <div key={product.id} className="mb-4 relative mx-2">
                        <ProductCard
                          id={product.id}
                          product={product}
                          fullWidthProduct={fullWidthProducts}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {true && <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />}
        {true && <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />}
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => {
          return (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
