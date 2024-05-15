"use client";
import React from "react";
import { map, isEmpty, get } from "lodash";
import { Swiper, SwiperSlide, Navigation, FreeMode } from "../swipers/slider";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import { IconButton } from "@material-tailwind/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
// @ts-ignore
import EasyEdit, { Types } from "react-easy-edit";
import { EditTextDisplay } from "../EditText";

import "./styles.css";

export type IconsViewerProps = {
  data?: any;
};

export const IconsGalleryViewer = ({ data }: IconsViewerProps) => {
  console.log("IconsGalleryData", data);
  const iconsData = get(data, "data.icons", []);
  const iconColor = get(data, "data.color", "#000000");
  const [currentIconIdx, setCurrentIconIdx] = React.useState(0);

  const [saveData, setSaveData] = React.useState(false);

  // state
  const editorObs$ = useEditorObserveable();
  const selectedWidgetRepo = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const cancel = () => {};

  const handleOnSaveData = React.useCallback(
    (key: string, value: string) => {
      if (!isEmpty(editorWidgetState)) {
        const getIconByIdx = iconsData[currentIconIdx];
        // all existing content data
        const allContentData = get(editorWidgetState, "data.content", {});
        const dataByIdx = get(allContentData, getIconByIdx, {});
        editorObs$.updateWidget(data.id, {
          ...editorWidgetState,
          data: {
            ...(editorWidgetState && editorWidgetState.data),
            icons: iconsData,
            color: iconColor,
            content: {
              ...allContentData,
              [getIconByIdx]: {
                ...dataByIdx,
                [key]: value,
              },
            },
          },
        });
      }
    },
    [
      data.id,
      editorObs$,
      editorWidgetState,
      iconsData,
      iconColor,
      currentIconIdx,
    ]
  );

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
          onSwiper={(swiper) => console.log("onswiper", swiper)}
          onSlideChange={(evt) => setCurrentIconIdx(evt.activeIndex)}
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
              <div className="flex flex-col justify-center items-center gap-3">
                <div>
                  <IconButton size="lg" className="flex">
                    <DynamicHeroIcon
                      className="h-8 w-8"
                      icon={icon || "Squares2X2Icon"}
                    />
                  </IconButton>
                </div>
                <div className="flex flex-col gap-2">
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={(value: any) => {
                      handleOnSaveData("title", value);
                    }}
                    onCancel={cancel}
                    attributes={{ name: "awesome-input", id: icon }}
                    value={
                      get(
                        editorWidgetState,
                        `data.content.${icon}.title`,
                        ``
                      ) || "Title"
                    }
                    displayComponent={<EditTextDisplay variant="h6" />}
                    saveButtonLabel={<CheckIcon className="h-4 w-4" />}
                    cancelButtonLabel={<XMarkIcon className="h-4 w-4" />}
                  />
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={(value: any) => {
                      handleOnSaveData("subtitle", value);
                    }}
                    onCancel={cancel}
                    attributes={{ name: "Subtitle", id: icon }}
                    value={
                      get(
                        editorWidgetState,
                        `data.content.${icon}.subtitle`,
                        ``
                      ) || "SubTitle"
                    }
                    displayComponent={<EditTextDisplay variant="small" />}
                    saveButtonLabel={<CheckIcon className="h-4 w-4" />}
                    cancelButtonLabel={<XMarkIcon className="h-4 w-4" />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
