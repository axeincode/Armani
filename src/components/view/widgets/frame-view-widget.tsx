"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { WidgetElement, WidgetEnum } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import {
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { SwiperThumbs } from "@/components/ui/swipers/swiper-thumbs";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
//import { BarChart } from "@/components/ui/charts";
import { BarChartWidget } from "@/components/editor/widgets/barGraph-widget";
import { PieChartWidget } from "@/components/editor/widgets/pieChart-widget";
import { MapWidget } from "@/components/editor/widgets/dynamic-map-widget";
import { TimelineComponent } from "@/components/ui/timeline";
import { IconsGalleryViewer } from "@/components/ui/icon-viewer";

export type FrameWidgetProps = {
  data: WidgetTypes;
};

export function FrameWidget({ data }: FrameWidgetProps) {
  // state
  const selectedWidgetRepo = useSelectedWidgetRepo();
  const hoveredWidgetObs = useHoveredWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  console.log("current widget data", data);
  const elementType = data.elementType;

  return (
    <Card
      className="flex w-full h-full m-0 mt-0"
      data-widget={WidgetEnum.FRAME}
      data-widget-id={data.id}
      data-target={data.id}
      data-element-type={elementType}
      id={data.id}
    >
      <CardHeader
        className="flex flex-col max-h-40 -mt-0 min-w-0 min-h-[75px] m-0 gap-1"
        data-widget-id={data.id}
      >
        <Typography
          variant="h6"
          color="blue-gray"
          data-id="INTERNAL_WIDGET"
          className="m-1"
        >
          {data.title || "Title"}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          data-id="INTERNAL_WIDGET"
          className="m-1"
        >
          {data.subtitle || "Subtitle"}
        </Typography>
      </CardHeader>
      <CardBody
        className="p-2 my-1  flex flex-grow flex-col justify-center items-center overflow-hidden"
        data-id="FRAME_CARD_BODY"
        data-root="true"
        data-widgetid={data.id}
      >
        {data.elementType &&
          (data.elementType === WidgetElement.PICTURE ||
            data.elementType === WidgetElement.GALLERY) && (
            <>
              {data.images && data.images.length > 0 && (
                <SwiperThumbs images={data.images} onClick={() => {}} />
              )}
            </>
          )}
        {data.elementType && data.elementType === WidgetElement.CHART && (
          <BarChartWidget data={data} />
        )}
        {data.elementType && data.elementType === WidgetElement.PIE_CHART && (
          <PieChartWidget data={data} />
        )}
        {data.elementType && data.elementType === WidgetElement.MAP && (
          <>
            <MapWidget data={data} />
          </>
        )}
        {data.elementType && data.elementType === WidgetElement.TIMELINE && (
          <>
            <TimelineComponent data={data} />
          </>
        )}
        {data.elementType &&
          data.elementType === WidgetElement.ICON_GALLERY && (
            <>
              <IconsGalleryViewer data={data} />
            </>
          )}
      </CardBody>
      {data.captionEnabled && (
        <CardFooter
          className="p-0 m-0 flex flex-col gap-1 max-h-40 min-h-[75px]"
          data-testid="cardfooter"
        >
          <>
            <Typography
              variant="h6"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {data.captionTitle || "Title"}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {data.captionSubtitle || "Subtitle"}
            </Typography>
          </>
        </CardFooter>
      )}
    </Card>
  );
}
