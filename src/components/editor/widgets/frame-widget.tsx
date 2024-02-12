"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { WidgetElement, WidgetEnum } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { isEmpty } from "lodash";
import { SwiperThumbs } from "@/components/ui/swiper-thumbs";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";

export type FrameWidgetProps = {
  data: WidgetTypes;
};

export function FrameWidget({ data }: FrameWidgetProps) {
  // state
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const handleOnInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  console.log("datacurrentwidget", data);
  const transformation = data.transformation;
  const elementType = data.elementType;
  const cardStyles = React.useMemo(() => {
    return {
      transform: `translate(${transformation.x || 0}px, ${
        transformation.y || 0
      }px)`,
      width: `${transformation.width || 0}px`,
      height: `${transformation.height || 0}px`,
    };
  }, [transformation]);

  const handleOnChange = () => {};
  const handleOnImageWidgetClick = (widgetType: WidgetEnum) => {
    selectedWidgetObs$.updateSelectedWidgetType(widgetType);
  };

  const handleOnImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    selectedWidgetObs$.setSelectedWidget(
      data.id,
      currentPage$.pageId!,
      WidgetEnum.FRAME
    );
    handleOnImageWidgetClick(WidgetEnum.PICTURE);
  };

  return (
    <Card
      className="absolute w-96 target p-2 border-solid border-2 border-gray-600 m-0 mt-0 z-50"
      data-widget={WidgetEnum.FRAME}
      data-widget-id={data.id}
      data-target={data.id}
      style={cardStyles}
    >
      <CardHeader className="flex flex-col max-h-24 -mt-0 min-w-0 min-h-0 m-0 gap-1">
        <Input
          label=""
          placeholder="Title"
          size="md"
          variant="static"
          crossOrigin={"true"}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          containerProps={{
            className: "min-w-0",
          }}
          onClick={handleOnInputClick}
          onChange={handleOnChange}
          value={data.title || ""}
        />
        <Input
          label=""
          size="md"
          placeholder="Subtitle"
          crossOrigin={"true"}
          variant="static"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
          onClick={handleOnInputClick}
          onChange={handleOnChange}
          value={data.subtitle || ""}
        />
      </CardHeader>
      {data.elementType &&
        (data.elementType === WidgetElement.PICTURE ||
          data.elementType === WidgetElement.GALLERY) && (
          <CardBody
            className="p-2 my-1 h-20 flex flex-grow"
            data-id="FRAME_CARD_BODY"
          >
            {data.images && data.images.length > 0 && (
              <SwiperThumbs images={data.images} onClick={handleOnImageClick} />
            )}
            {isEmpty(data.images) && (
              <div
                className="flex flex-col flex-grow justify-center items-center h-24"
                data-id="INTERNAL_WIDGET"
              >
                <Typography
                  variant="h6"
                  color="blue-gray"
                  data-id="INTERNAL_WIDGET"
                >
                  No Image
                </Typography>
                <Button
                  color="blue"
                  size="sm"
                  className="mt-2"
                  data-testid="add-image-button"
                  data-id="INTERNAL_WIDGET"
                  data-widget={WidgetEnum.PICTURE}
                >
                  Add Image
                </Button>
              </div>
            )}
          </CardBody>
        )}
      {data.captionEnabled && (
        <CardFooter
          className="p-0 m-0 flex flex-col gap-1 max-h-24"
          data-testid="cardfooter"
        >
          <>
            <Input
              label=""
              placeholder="CAPTION TITLE"
              size="md"
              crossOrigin={"true"}
              variant="static"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              containerProps={{
                className: "min-w-0",
              }}
              onChange={handleOnChange}
              value={data.captionTitle || ""}
            />
            <Input
              label=""
              placeholder="caption subtitle"
              size="md"
              variant="static"
              crossOrigin={"true"}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              containerProps={{
                className: "min-w-0",
              }}
              onChange={handleOnChange}
              value={data.captionSubtitle || ""}
            />
          </>
        </CardFooter>
      )}
    </Card>
  );
}
