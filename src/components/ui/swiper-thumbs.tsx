/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { WidgetImageTypes } from "@/types/editor.types";

export type SwiperThumbsProps = {
  images: WidgetImageTypes[];
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export const SwiperThumbs = ({ images, onClick }: SwiperThumbsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Swiper
      navigation={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
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
