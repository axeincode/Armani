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
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { isEmpty } from "lodash";
import { SwiperThumbs } from "@/components/ui/swipers";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
// import { BarChart } from "@/components/ui/charts";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { BarChartWidget } from "./barGraph-widget";
import { PieChartWidget } from "./pieChart-widget";
import { MapWidget } from "./dynamic-map-widget";
import { ReactTableWidget } from "@/components/ui/table";
import { TabsComponent } from "@/components/ui/tabs/tabs";
import { cn } from "@/lib/utils";
import { TimelineComponent } from "@/components/ui/timeline";
import { IconsGalleryViewer } from "@/components/ui/icon-viewer";
import { ContactCardEdit } from "@/components/ui/contact-card";
import { VideoPlayer } from "@/components/ui/video-player";
import { ReactCalendly } from "@/components/ui/calendly";
import { ReactIFrame } from "@/components/ui/iframe/react-iframe";
import { TextWidget } from "@/components/ui/text";
import { SpreadSheetWidget } from "@/components/ui/spreadsheet";
import { PdfWidget } from "@/components/ui/pdf-widget";

export type FrameWidgetProps = {
  data: WidgetTypes;
};

export function FrameWidget({ data }: FrameWidgetProps) {
  // state
  const editorObs$ = useEditorObserveable();
  const selectedWidgetRepo = useSelectedWidgetRepo();
  const hoveredWidgetObs = useHoveredWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const handleOnInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const elementType = data.elementType;

  const handleOnChange = () => {};
  const handleOnImageWidgetClick = (widgetType: WidgetElement) => {
    selectedWidgetRepo.updateSelectedWidgetType(widgetType);
  };

  const handleOnImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    selectedWidgetRepo.setSelectedWidget(
      data.id,
      currentPage$.pageId!,
      elementType || WidgetElement.NONE
    );
    handleOnImageWidgetClick(elementType || WidgetElement.NONE);
  };

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    hoveredWidgetObs.set(
      data.id,
      currentPage$.pageId!,
      elementType || WidgetElement.NONE
    );
  };

  const handleOnRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    selectedWidgetRepo.setSelectedWidget(
      data.id,
      currentPage$.pageId!,
      elementType || WidgetElement.NONE
    );
  };

  const handleOnDelete = (e: any) => {
    selectedWidgetRepo.unSelect();
    editorObs$.deleteWidget(currentPage$.pageId!, data.id);
  };

  const handleOnClickWidget = (e: React.MouseEvent<HTMLDivElement>) => {
    if (data.id !== selectedWidgetState.widgetId) {
      selectedWidgetRepo.setSelectedWidget(
        data.id,
        currentPage$.pageId!,
        elementType || WidgetElement.NONE
      );
    }
  };

  const handleOnSaveTableData = (data: any) => {
    editorObs$.updateWidget(data.id, {
      ...editorWidgetState,
      data: {
        tableData: data,
      },
    });
  };

  const handleOnSaveContactData = (data: any) => {
    editorObs$.updateWidget(data.id, {
      ...editorWidgetState,
      data: {
        contactData: data,
      },
    });
  };

  if (!data) return null;

  return (
    <>
      <Card
        className="flex w-full h-full m-0 mt-0 z-1 rounded-none "
        data-widget={WidgetEnum.FRAME}
        data-root="true"
        onClick={handleOnRootClick}
        data-widgetid={data.id}
        id={data.id}
      >
        {data.titleEnabled && (
          <>
            <CardHeader
              className={cn(
                "flex flex-col max-h-28 -mt-0 min-w-0 min-h-[25px] m-0 gap-1",
                !isEmpty(data.subtitle) && "min-h-[75px]"
              )}
              data-widgetid={data.id}
            >
              {data.title && (
                <Typography
                  variant="h6"
                  color="blue-gray"
                  data-id="INTERNAL_WIDGET"
                  className="m-1 x-drag-handle cursor-move"
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
        )}
        <CardBody
          className={cn(
            "p-2 my-1 mb-1 flex flex-grow flex-col justify-center items-center overflow-hidden",
            data.elementType === WidgetElement.TIMELINE && "items-start",
            data.elementType === WidgetElement.PICTURE && "items-center",
            "overflow-x-hidden overflow-y-auto scrollbar-thin"
          )}
          data-id="FRAME_CARD_BODY"
          data-root="true"
          onClick={handleOnRootClick}
          data-widgetid={data.id}
        >
          {data.elementType &&
            (data.elementType === WidgetElement.PICTURE ||
              data.elementType === WidgetElement.GALLERY) && (
              <>
                {data.images && data.images.length > 0 && (
                  <SwiperThumbs
                    images={data.images}
                    onClick={handleOnImageClick}
                  />
                )}
              </>
            )}
          {data.elementType && data.elementType === WidgetElement.CHART && (
            <>
              <BarChartWidget data={data} />
            </>
          )}
          {data.elementType && data.elementType === WidgetElement.PIE_CHART && (
            <>
              <PieChartWidget data={data} />
            </>
          )}
          {data.elementType && data.elementType === WidgetElement.MAP && (
            <MapWidget data={data} />
          )}
          {data.elementType &&
            data.elementType === WidgetElement.TABLE &&
            !isEmpty(data) && (
              <ReactTableWidget
                data={data}
                handleOnSaveTableData={handleOnSaveTableData}
              />
            )}
          {data.elementType && data.elementType === WidgetElement.TIMELINE && (
            <TimelineComponent data={data} />
          )}
          {data.elementType &&
            data.elementType === WidgetElement.ICON_GALLERY && (
              <IconsGalleryViewer data={data} />
            )}
          {data.elementType &&
            data.elementType === WidgetElement.CONTACT_CARD && (
              <ContactCardEdit
                data={data}
                handleOnSave={handleOnSaveContactData}
              />
            )}
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
            <TextWidget data={data} />
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
            className="p-0 m-0 flex flex-col gap-1 max-h-24 min-h-[75px]"
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
      </Card>
      {/* Add icon to top right for each widget item */}
      {data.id === selectedWidgetState.widgetId && (
        <XCircleIcon
          onClick={handleOnDelete}
          color="blue-gray"
          className="h-5 w-5 absolute -top-1 -right-5"
          data-testid="deleteable"
        />
      )}
    </>
  );
}
