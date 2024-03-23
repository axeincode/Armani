"use client";
import React from "react";
import { first, map, startCase, get, debounce } from "lodash";
import { Swiper, SwiperSlide, Navigation, FreeMode } from "../swipers/slider";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import { IconButton } from "@material-tailwind/react";

import "./styles.css";

export type IconsViewerProps = {
  data?: any;
};

export const IconsGalleryViewer = ({ data }: IconsViewerProps) => {
  const iconsData = get(data, "data.icons", []);
  const iconColor = get(data, "data.color", "#000000");
  return (
    <div className="relative min-w-0 overflow-hidden my-swiper-container grid">
      <div className="min-w-0">
        <Swiper
          slidesPerView={3}
          grabCursor={true}
          centeredSlides={true}
          slidesPerGroupSkip={1}
          keyboard={{
            enabled: true,
          }}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="myiconviewer"
          style={{
            // @ts-ignore
            "--swiper-navigation-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
            "--swiper-pagination-color": "rgb(33 33 33 / var(--tw-bg-opacity))",
            "--swiper-navigation-size": "5",
            background: "none",
          }}
        >
          {map(iconsData, (icon: any) => (
            <SwiperSlide key={icon} className="">
              <div>
                <IconButton size="lg" className="flex">
                  <DynamicHeroIcon
                    className="h-8 w-8"
                    icon={icon || "Squares2X2Icon"}
                  />
                </IconButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
