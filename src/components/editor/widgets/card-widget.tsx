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
import { WidgetEnum } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import { useEditorObserveable, useSelectedWidgetRepo } from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { isEmpty } from "lodash";
import { SwiperThumbs } from "@/components/ui/swiper-thumbs";

export type CardWidgetProps = {
  data: WidgetTypes;
};

export function CardWidget({ data }: CardWidgetProps) {
  // state
  const handleOnInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  console.log("datacurrentwidget", data);
  const transformation = data.transformation;
  const cardStyles = React.useMemo(() => {
    return {
      transform: `translate(${transformation.x || 0}px, ${
        transformation.y || 0
      }px)`,
      width: `${transformation.width || 0}px`,
      height: `${transformation.height || 0}px`,
    };
  }, [transformation]);

  const handleOnChange = (e: any) => {};

  return (
    <Card
      className="w-96 target p-2 border-solid border-2 border-gray-600 m-0 mt-0 z-50"
      data-widget={WidgetEnum.CARD}
      data-widget-id={data.id}
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
      <CardBody className="p-2 my-1 h-20 flex flex-grow ">
        {data.images && data.images.length > 0 && (
          <SwiperThumbs images={data.images} />
        )}
        {isEmpty(data.images) && (
          <div className="flex flex-col flex-grow justify-center items-center h-24"></div>
        )}
      </CardBody>
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
