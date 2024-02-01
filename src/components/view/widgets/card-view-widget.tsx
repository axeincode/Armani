"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { WidgetEnum } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import { isEmpty } from "lodash";
import { SwiperThumbs } from "@/components/ui/swiper-thumbs";

export type CardViewWidgetProps = {
  data: WidgetTypes;
};

export function CardViewWidget({ data }: CardViewWidgetProps) {
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
  const hasImages = !isEmpty(data.images);
  const hasSubtitleAndNoImages =
    !isEmpty(data.subtitle) && isEmpty(data.images);

  return (
    <Card
      className="w-96 target p-2 border-solid border-2 border-gray-600 m-0 mt-0 z-50 "
      data-widget={WidgetEnum.CARD}
      data-widget-id={data.id}
      style={cardStyles}
    >
      <CardHeader className="flex flex-col max-h-24 -mt-0 min-w-0 min-h-0 m-0 gap-1 p-1">
        <Typography variant="h5">{data.title || ""}</Typography>
        {!hasSubtitleAndNoImages && data.subtitle && (
          <Typography variant="small">{data.subtitle || ""}</Typography>
        )}
      </CardHeader>
      {data.images && data.images.length > 0 && (
        <>
          <CardBody className="p-2 my-1 h-20 flex flex-grow ">
            <SwiperThumbs images={data.images} />
          </CardBody>
        </>
      )}
      {hasSubtitleAndNoImages && (
        <CardBody className="p-2 my-1 h-20 flex flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200 scrollbar-thumb-rounded">
          <Typography variant="small">{data.subtitle || ""}</Typography>
        </CardBody>
      )}
      {data.captionEnabled && (
        <CardFooter
          className="p-0 m-0 flex flex-col gap-1 max-h-24"
          data-testid="cardfooter"
        >
          <>
            {data.captionTitle && (
              <Typography variant="h5">{data.captionTitle || ""}</Typography>
            )}
            {data.captionSubtitle && (
              <div className="flex flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200 scrollbar-thumb-rounded">
                <Typography variant="small">
                  {data.captionSubtitle || ""}
                </Typography>
              </div>
            )}
          </>
        </CardFooter>
      )}
    </Card>
  );
}
