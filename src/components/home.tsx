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
  handleOnCreate: () => void;
  isLoading: boolean;
  decks: EditorStateTypes | undefined;
}

export function Home(props: homeProps) {
  const { data, handleOnEdit, handleOnCreate, isLoading, decks } = props;

  if (data) {
    return (
      <div className="flex flex-1 flex-col h-full w-full">
        <div className="flex flex-1 flex-col w-full">
          <img
            className="h-44 w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1699025087138-a764dee76ee4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1900w"
            alt="nature image"
          />
          <div className="mt-[-20px] flex flex-1 justify-center shadow-inner">
            <CompanyLogo inverse={false} variant="h2" iconSize="h-10 w-10" />
          </div>
        </div>
        <div className="container flex flex-1 flex-col h-full mx-[32px] lg:mx-48 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white flex flex-col items-center justify-center"
              >
                <Card className="mt-6 w-96">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img src={imageList[i]} alt="card-image" />
                  </CardHeader>
                  <CardBody className="flex flex-col justify-center items-center">
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {data[i].title}
                    </Typography>
                    <Typography>{content[i].subtitle}</Typography>
                  </CardBody>
                  <CardFooter className="pt-0 flex gap-2 justify-center items-center">
                    <Button>View</Button>
                    <Button
                      onClick={() =>
                        handleOnEdit("916a31b4-68df-4892-b3ef-a336bb849452")
                      }
                    >
                      Edit
                    </Button>
                    <Button>More</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
            {decks &&
              map(decks.entities.decks, (deck, i) => (
                <div
                  key={i}
                  className="bg-white flex flex-col items-center justify-center"
                >
                  <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img src={deck.coverPhoto} alt="card-image" />
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
                      <Button>View</Button>
                      <Button
                        onClick={() =>
                          handleOnEdit("916a31b4-68df-4892-b3ef-a336bb849452")
                        }
                      >
                        Edit
                      </Button>
                      <Button>More</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
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
    );
  } else return <div> Empty State</div>;
}
