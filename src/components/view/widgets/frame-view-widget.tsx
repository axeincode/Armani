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
import { ReactTableViewWidget } from "@/components/ui/table";
import { useMeasure } from "react-use";

import { isEmpty } from "lodash";
import { ContactCardView } from "@/components/ui/contact-card";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/ui/video-player";
import { ReactCalendly } from "@/components/ui/calendly";
import { ReactIFrame } from "@/components/ui/iframe/react-iframe";
import { TextWidget } from "@/components/ui/text";
import { SpreadSheetWidget } from "@/components/ui/spreadsheet";
import { PdfWidget } from "@/components/ui/pdf-widget";

export type FrameWidgetProps = {
  data: WidgetTypes;
  height?: number;
  width?: number;
};

export function FrameWidget({ data, height, width }: FrameWidgetProps) {
  // state
  const selectedWidgetRepo = useSelectedWidgetRepo();
  const hoveredWidgetObs = useHoveredWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  console.log("current widget height width", height, width);
  const elementType = data.elementType;

  return (
    <Card
      className="flex w-full h-full m-0 mt-0 rounded-none"
      data-widget={WidgetEnum.FRAME}
      data-widget-id={data.id}
      data-target={data.id}
      data-element-type={elementType}
      id={data.id}
    >
      <div
        className={cn(
          "flex flex-col",
          "overflow-x-hidden overflow-y-auto scrollbar-thin"
        )}
        style={{
          height: height ? `${Math.floor(Number(height))}px` : "100%",
        }}
      >
        {isEmpty(data.elementType) ||
          (data.elementType && data.titleEnabled && (
            <>
              <CardHeader
                className={cn(
                  "flex flex-col max-h-28 -mt-0 min-w-0 min-h-[25px] m-0 gap-1",
                  !isEmpty(data.subtitle) && "min-h-[75px]"
                )}
                data-widget-id={data.id}
              >
                {data.title && (
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    data-id="INTERNAL_WIDGET"
                    className="m-1"
                  >
                    {data.title || "Title"}
                  </Typography>
                )}
                {data.subtitle && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    data-id="INTERNAL_WIDGET"
                    className="m-1"
                  >
                    {data.subtitle || "Subtitle"}
                  </Typography>
                )}
              </CardHeader>
            </>
          ))}
        <CardBody
          className={cn(
            "p-2 my-1  flex flex-grow flex-col justify-center items-center overflow-hidden",
            "overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
          )}
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
          {data.elementType &&
            data.elementType === WidgetElement.TABLE &&
            !isEmpty(data) && <ReactTableViewWidget data={data} />}
          {data.elementType &&
            data.elementType === WidgetElement.CONTACT_CARD &&
            !isEmpty(data) && <ContactCardView data={data} />}

          {data.elementType && data.elementType === WidgetElement.VIDEO && (
            <VideoPlayer data={data} />
          )}
          {data.elementType && data.elementType === WidgetElement.CALENDLY && (
            <ReactCalendly data={data} />
          )}
          {data.elementType && data.elementType === WidgetElement.IFRAME && (
            <ReactIFrame data={data} />
          )}
          {data.elementType && data.elementType === WidgetElement.PARAGRAPH && (
            <TextWidget data={data} isView={true} />
          )}
          {data.elementType &&
            data.elementType === WidgetElement.SPREADSHEET && (
              <SpreadSheetWidget data={data} />
            )}
          {data.elementType && data.elementType === WidgetElement.PDF && (
            <PdfWidget data={data} />
          )}
        </CardBody>
        {data.captionEnabled && (
          <CardFooter
            className="p-0 m-0 flex flex-col gap-1 max-h-40 min-h-[75px]"
            data-testid="cardfooter"
          >
            <>
              {data.captionTitle && (
                <Typography
                  variant="h6"
                  color="blue-gray"
                  data-id="INTERNAL_WIDGET"
                  className="m-1"
                >
                  {data.captionTitle || "Title"}
                </Typography>
              )}
              {data.captionSubtitle && (
                <Typography
                  variant="small"
                  color="blue-gray"
                  data-id="INTERNAL_WIDGET"
                  className="m-1"
                >
                  {data.captionSubtitle || "Subtitle"}
                </Typography>
              )}
            </>
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
