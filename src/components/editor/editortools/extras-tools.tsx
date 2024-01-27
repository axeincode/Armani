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

export const ExtrasTools = () => {
  const [openDisclaimer, setOpenDisclaimer] = React.useState(false);
  const [openNda, setOpenNda] = React.useState(false);
  const handleOpen = () => setOpenDisclaimer((cur) => !cur);
  const handleOpenNda = () => setOpenNda((cur) => !cur);

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
              defaultValue={
                "This presentation is for informational purposes only and does not constitute an offer, solicitation, or recommendation to buy, sell, or  invest in commercial real estate. Any projections,"
              }
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
              <Switch defaultChecked label="Enabled" crossOrigin={"true"} />
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
              defaultValue={
                "This presentation is for informational purposes only and does not constitute an offer, solicitation, or recommendation to buy, sell, or  invest in commercial real estate. Any projections,"
              }
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
