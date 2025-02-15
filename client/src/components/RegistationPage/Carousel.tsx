"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";



type CarouselProps = {
  opts?: any;
  plugins?: any[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: any) => void;
};

type CarouselApiType = any;

export default function Carousel({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
}: CarouselProps) {
  const autoplayOptions = {
    delay: 5000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      loop: true,
    },
    [Autoplay(autoplayOptions), ...(plugins || [])]
  );

  return (
    <div className="relative h-screen">
      <div ref={carouselRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <img
                src={`../../../CarouselImg/Image-${index + 1}.jpg`}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
