/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CompanyLogo } from "./company-logo";
import { AppInterface } from "../types/interface";
import { EditorStateTypes } from "@/types/editor.types";
import { map } from "lodash";
import { useMedia } from "react-use";
import { cn } from "@/lib/utils";

const content = [
  {
    title: "Isle Ridge Towers",
    subtitle: "New York, NY",
    visits: {
      last7Days: 57,
      last30Days: 122,
      sinceStart: 480,
    },
  },
  {
    title: "The Atrium",
    subtitle: "Boston, MA",
    visits: {
      last7Days: 57,
      last30Days: 122,
      sinceStart: 480,
    },
  },
  {
    title: "Beechside Apartments",
    subtitle: "Miami, FL",
    visits: {
      last7Days: 57,
      last30Days: 122,
      sinceStart: 480,
    },
  },
  {
    title: "City Apartments",
    subtitle: "New York, NY",
    visits: {
      last7Days: 57,
      last30Days: 122,
      sinceStart: 480,
    },
  },
];
const imageList = [
  "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w",
  "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w",
  "https://images.unsplash.com/photo-1474696100102-01b8519f06f3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w",
];

interface homeProps {
  data: AppInterface[] | undefined;
  handleOnEdit: (id: string) => void;
  handleOnView: (id: string) => void;
  handleOnCreate: () => void;
  isLoading: boolean;
  decks: EditorStateTypes | undefined;
}

export function Home(props: homeProps) {
  const { data, handleOnEdit, handleOnView, handleOnCreate, isLoading, decks } =
    props;

  // check if medium screen
  // check if large screeen
  const isLargeScreen = useMedia("(min-width: 1024px)", true);
  // check if subLarge
  const isSubLargeScreen = useMedia("(min-width: 1580px)", false);
  // check if super super large screen
  const isXLargeScreen = useMedia("(min-width: 1920px)", false);
  // check if super super large screen
  const isXXLargeScreen = useMedia("(min-width: 2560px)", false);
  let gridCols = isLargeScreen ? "grid-cols-2 gap-2" : "grid-cols-1";
  if (isSubLargeScreen) gridCols = "grid-cols-3 gap-3";
  if (isXLargeScreen) gridCols = "grid-cols-4 gap-3";
  if (isXXLargeScreen) gridCols = "grid-cols-6 gap-4";

  if (data) {
    return (
      <div
        className="flex flex-col flex-1 justify-start"
        data-testid="main-content"
      >
        <div
          className="flex flex-col justify-start"
          data-testid="main-bannerheader"
        >
          <img
            className="h-44 w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1699025087138-a764dee76ee4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1900w"
            alt="nature image"
          />
          <div className="mt-[-20px] flex flex-1 justify-center shadow-inner">
            <CompanyLogo inverse={false} variant="h2" iconSize="h-10 w-10" />
          </div>
        </div>
        <div
          className="flex flex-1 flex-col mx-[32px] lg:mx-48 mt-8"
          data-testid="deck-wrapper"
        >
          <div className={cn("grid grid-cols-1 gap-1", gridCols)}>
            {decks &&
              map(decks.entities.decks, (deck, i) => (
                <div
                  key={i}
                  className="bg-white flex flex-col items-center justify-center"
                >
                  <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img
                        src={deck.coverPhoto || deck.logo?.url}
                        alt={deck.title}
                      />
                    </CardHeader>
                    <CardBody className="flex flex-col justify-center items-center">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-1"
                      >
                        {deck.title}
                      </Typography>
                      <Typography>{deck.subtitle}</Typography>
                    </CardBody>
                    <CardFooter className="pt-0 flex gap-2 justify-center items-center">
                      <Button onClick={() => handleOnView(deck.id)}>
                        View
                      </Button>
                      <Button onClick={() => handleOnEdit(deck.id)}>
                        Edit
                      </Button>
                      <Button>More</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            <div className="bg-white flex flex-col items-center justify-center">
              <Card className="mt-6 w-96 h-56 transition duration-300 ease-in-out hover:scale-110">
                {isLoading && (
                  <div className="max-w-full animate-pulse">
                    <CardHeader
                      color="blue-gray"
                      className="relative h-56 flex flex-col flex-grow justify-center items-center"
                    >
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                    </CardHeader>
                  </div>
                )}

                {!isLoading && (
                  <CardHeader color="blue-gray" className="relative h-56">
                    <div className="h-56 bg-blue-gray-100 flex justify-center items-center">
                      <Button
                        size="md"
                        className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        ripple={false}
                        onClick={handleOnCreate}
                      >
                        Create New
                      </Button>
                    </div>
                  </CardHeader>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div> Empty State</div>;
}
