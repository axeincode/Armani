import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, FreeMode, Navigation } from "../swipers/slider";

export type SectionScrollerProps = {
  children: React.ReactNode;
};

export const SectionScroller = ({ children }: SectionScrollerProps) => {
  const onSwiperPrev = () => {
    console.log("on nav previous");
  };

  const onSwiperNext = () => {
    console.log("on nav next");
  };

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="sectionswiper"
        style={{
          // @ts-ignore
          "--swiper-navigation-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
          "--swiper-pagination-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
          "--swiper-navigation-size": "5",
          background: "none",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }}
      >
        {children}
      </Swiper>
    </>
  );
};
