/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Thumbs, EffectCoverflow, FreeMode } from "swiper/modules";
import { WidgetImageTypes } from "@/types/editor.types";

export type SwiperCarouselProps = {
  images: WidgetImageTypes[];
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export const SwiperCarousel = ({ images, onClick }: SwiperCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      spaceBetween={30}
      navigation={true}
      coverflowEffect={{
        rotate: 5,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: true,
      }}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[EffectCoverflow, FreeMode, Navigation, Thumbs]}
      style={{
        // @ts-ignore
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      data-id="swiper-thumbs"
    >
      {images &&
        images.map((image: WidgetImageTypes) => {
          return (
            <SwiperSlide key={image.id} onClick={onClick}>
              <img
                src={image.url}
                alt="card-image"
                className="object-cover h-full w-full rounded-md"
                data-id="swiper-thumbs-image"
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
