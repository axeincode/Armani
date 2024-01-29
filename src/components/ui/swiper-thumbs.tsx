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
};

export const SwiperThumbs = ({ images }: SwiperThumbsProps) => {
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
    >
      {images &&
        images.map((image: WidgetImageTypes) => {
          return (
            <SwiperSlide key={image.id}>
              <img
                src={image.url}
                alt="card-image"
                className="object-cover h-full w-full rounded-md"
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
