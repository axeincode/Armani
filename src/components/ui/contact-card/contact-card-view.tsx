/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { get } from "lodash";
import { LinkedinIcon } from "lucide-react";

export type ContactCardViewProps = {
  data: any;
};

function Icon({ id, open }: { id: number; open: boolean }) {
  return (
    <>
      <ChevronDownIcon
        key={id}
        strokeWidth={2.5}
        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </>
  );
}

export const ContactCardView = ({ data }: ContactCardViewProps) => {
  // state
  const [expandBio, setExpandBio] = React.useState(false);
  const [expandContact, setExpandContact] = React.useState(false);

  const widgetData = get(data, "data.contactData", {});
  const imgUrl = get(
    data,
    "data.images.url",
    "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 150w"
  );
  console.log("contactus data props", data);

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="flex justify-center items-center h-32">
        <img src={imgUrl} alt="contact" className="h-32 w-32" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Typography
          variant="h6"
          color="blue-gray"
          data-id="INTERNAL_WIDGET"
          className="m-1"
        >
          {widgetData.title || "Title"}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          data-id="INTERNAL_WIDGET"
          className="m-1"
        >
          {widgetData.subtitle || "Subtitle"}
        </Typography>
      </div>
      <div className="flex flex-col px-3">
        <Accordion open={expandBio} icon={<Icon id={1} open={expandBio} />}>
          <AccordionHeader onClick={() => setExpandBio(!expandBio)}>
            Bio
          </AccordionHeader>
          <AccordionBody>
            <Typography
              variant="small"
              color="blue-gray"
              className="m-1 text-wrap"
            >
              {widgetData.phone || ""}
            </Typography>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={expandContact}
          icon={<Icon id={2} open={expandContact} />}
        >
          <AccordionHeader onClick={() => setExpandContact(!expandContact)}>
            Contact
          </AccordionHeader>
          <AccordionBody>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <DevicePhoneMobileIcon className="h-6 w-6" />
                <Typography variant="small" color="blue-gray" className="m-1">
                  {widgetData.phone || ""}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-6 w-6" />
                <Typography variant="small" color="blue-gray" className="m-1">
                  {widgetData.email || ""}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="h-6 w-6" />
                <Typography variant="small" color="blue-gray" className="m-1">
                  {widgetData.linkedin || ""}
                </Typography>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};
