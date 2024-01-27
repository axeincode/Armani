"use client";
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

export type CardWidgetProps = {
  data: WidgetTypes;
};

export function CardWidget({ data }: CardWidgetProps) {
  // state
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const currentWidgetState = useCurrentWidgetObserveable();

  const handleOnInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleOnChange = (e: any) => {};

  return (
    <Card
      className="w-96 target p-2 border-solid border-2 border-gray-600 m-0 mt-0 z-50"
      data-widget={WidgetEnum.CARD}
      data-widget-id={data.id}
    >
      <CardHeader className="flex flex-col flex-grow -mt-0 min-w-0 min-h-0 m-0 gap-1">
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
      <CardBody className="p-2 m-0 h-20 flex flex-grow ">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
          alt="card-image"
          className="object-cover h-full w-full rounded-md"
        />
      </CardBody>
      <CardFooter className="p-0 m-0 flex flex-col flex-grow gap-1">
        {data.captionEnabled && (
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
        )}
      </CardFooter>
    </Card>
  );
}
