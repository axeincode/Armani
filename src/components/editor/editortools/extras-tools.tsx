"use client";
import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  DialogFooter,
  Switch,
} from "@material-tailwind/react";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";

export const ExtrasTools = () => {
  const [openDisclaimer, setOpenDisclaimer] = React.useState(false);
  const [openNda, setOpenNda] = React.useState(false);
  const handleOpen = () => setOpenDisclaimer((cur) => !cur);
  const handleOpenNda = () => setOpenNda((cur) => !cur);
  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();

  const handleOnDisclaimerDescChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    editor$.updateDeckInfo(deckInfo?.id, "disclaimer", {
      ...deckInfo?.disclaimer,
      description: e.target.value,
    });
  };

  const handleOnAskForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "nda", {
      ...deckInfo?.nda,
      askFor: e.target.value,
    });
  };

  const handleOnNdaDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "nda", {
      ...deckInfo?.nda,
      description: e.target.value,
    });
  };

  const handleOnDeckNdaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "nda", {
      ...deckInfo?.nda,
      enabled: Boolean(e.target.checked),
    });
  };

  return (
    <div className="lg:w-28 flex flex-grow-0 flex-col gap-2 px-1 shadow-lg mr-1 bg-gray-100">
      <Button variant="filled" size="sm" onClick={handleOpen}>
        Disclaimer
      </Button>
      <Button variant="filled" size="sm" onClick={handleOpenNda}>
        NDA
      </Button>

      <Dialog size="sm" open={openDisclaimer} handler={handleOpen}>
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Disclaimer
            </Typography>
            <Textarea
              color="gray"
              size="md"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              rows={3}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleOnDisclaimerDescChange}
              value={deckInfo?.disclaimer?.description || ""}
            />
          </CardBody>
        </Card>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog size="sm" open={openNda} handler={handleOpenNda}>
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-grow h-6 items-start justify-between">
              <Typography variant="h6" color="gray">
                NDA
              </Typography>
              <Switch
                label="Enabled"
                crossOrigin={"true"}
                checked={deckInfo?.nda?.enabled || false}
                onChange={handleOnDeckNdaChange}
              />
            </div>
            <div className="flex flex-col items-start gap-1 lg:w-44">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium w-16"
              >
                Ask for
              </Typography>
              <Input
                crossOrigin={"true"}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{ className: "!min-w-[10px]" }}
                placeholder="email/phone"
                value={deckInfo?.nda?.askFor || ""}
                onChange={handleOnAskForChange}
              />
            </div>

            <Textarea
              color="gray"
              size="md"
              className="px-1 !border-t-blue-gray-200 focus:!border-t-gray-900"
              rows={1}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={deckInfo?.nda?.description || ""}
              onChange={handleOnNdaDescChange}
            />
          </CardBody>
        </Card>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenNda}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpenNda}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
