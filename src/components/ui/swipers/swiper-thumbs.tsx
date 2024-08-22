/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, Navigation, Thumbs } from "./slider";
import { WidgetImageTypes } from "@/types/editor.types";
// custom styles
import "./styles.css";

export type SwiperThumbsProps = {
  images: WidgetImageTypes[];
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export const SwiperThumbs = ({ images, onClick }: SwiperThumbsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="min-w-0 overflow-hidden my-swiper-container grid">
      <div className="min-w-0">
        <Swiper
          slidesPerView={1}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          spaceBetween={30}
          style={{
            // @ts-ignore
            "--swiper-navigation-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
            "--swiper-pagination-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
            "--swiper-navigation-size": "5",
            background: "none",
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
                    className="w-full rounded-md"
                    data-id="swiper-thumbs-image"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};
