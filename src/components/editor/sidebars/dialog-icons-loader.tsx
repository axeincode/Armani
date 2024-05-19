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
  DialogHeader,
  Input,
  Checkbox,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import {
  camelCase,
  map,
  mapKeys,
  get,
  take,
  filter,
  isEmpty,
  includes,
} from "lodash";
import { XCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";

export type DialogIconsLoaderProps = {
  open: boolean;
  handler: () => void;
};

export function DialogIconsLoader({ open, handler }: DialogIconsLoaderProps) {
  const [iconsList, setIconsList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const [iconColor, setIconColor] = React.useState<string>("blue");

  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  React.useEffect(() => {
    // @ts-ignore
    const { icons, color } = get(editorWidgetState, "data", {});
    if (isEmpty(icons)) {
      setSelectedIcons([]);
    } else {
      setSelectedIcons(icons as string[]);
    }
    setIconColor(color || "blue");
  }, [editorWidgetState]);

  React.useEffect(() => {
    setIsLoading(true);
    const IncludeList = [
      "AcademicCap",
      "AdjustmentsHorizontal",
      "AdjustmentsVertical",
      "ArchiveBox",
      "ArchiveBoxXMark",
      "ArrowDownCircle",
      "ArrowDownLeft",
      "ArrowDownOnSquare",
      "ArrowDownOnSquareStack",
      "ArrowDownRight",
      "ArrowDownTray",
      "ArrowLeft",
      "ArrowLeftCircle",
      "ArrowLeftOnRectangle",
      "ArrowLongDown",
      "ArrowLongLeft",
      "ArrowLongRight",
      "ArrowLongUp",
    ];
    fetch("/api/editor")
      .then((response) => response.json())
      .then((data) => {
        const icons = get(data, "data.icons", {});
        const casedIcons = mapKeys(icons, (value, key) => {
          // camel case the keys
          const camelCaseKey = camelCase(key);
          // uppercase firstLetter
          return camelCaseKey.charAt(0).toUpperCase() + camelCaseKey.slice(1);
        });
        const listOfIconNames = map(casedIcons, (value, key) => {
          return key + "Icon";
        });
        const includeListIcons = map(IncludeList, (icon) => {
          return icon + "Icon";
        });
        const filteredIcons = filter(listOfIconNames, (icon: string) =>
          includeListIcons.includes(icon)
        );
        setIconsList(filteredIcons);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error("Error fetching icons", error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const saveData = () => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: {
        ...(editorWidgetState && editorWidgetState.data),
        icons: selectedIcons,
        color: iconColor,
      },
    });
    handler();
  };

  const onIconClick = (icon: string) => {
    // remove icon if already selected or add icons.
    if (includes(selectedIcons, icon)) {
      setSelectedIcons(selectedIcons.filter((item) => item !== icon));
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handler}>
        <DialogHeader className="flex justify-between items-center">
          <Typography color="blue-gray" variant="h6">
            Icons
          </Typography>
          <IconButton
            color="blue-gray"
            className=""
            size="sm"
            onClick={handler}
          >
            <XCircleIcon className="h-6 w-6" />
          </IconButton>
        </DialogHeader>
        <Card className="mx-auto w-full max-w-[32rem] h-92">
          <CardBody className="flex flex-col gap-4 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading && (
                <div className="flex flex-col justify-center items-center">
                  <Typography color="blue-gray" variant="small">
                    Loading...
                  </Typography>
                </div>
              )}
              {isError && (
                <div className="flex flex-col justify-center items-center">
                  <Typography color="red" variant="small">
                    Error fetching icons
                  </Typography>
                </div>
              )}
              {isSuccess &&
                map(iconsList, (icon, index) => {
                  return (
                    <div
                      key={icon}
                      className="flex flex-col justify-center items-center gap-2 shadow border-gray-1 border-solid border-2 rounded-md p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:border-gray-500"
                    >
                      <>
                        {includes(selectedIcons, icon) && (
                          <>
                            <Badge
                              color="purple"
                              {...(includes(selectedIcons, icon) && {
                                color: "green",
                                content: (
                                  <CheckIcon
                                    className="h-4 w-4 text-white"
                                    strokeWidth={2.5}
                                  />
                                ),
                              })}
                              className="bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20"
                            >
                              <IconButton onClick={() => onIconClick(icon)}>
                                <DynamicHeroIcon
                                  icon={icon || "Squares2X2Icon"}
                                  className="h-8 w-8 text-blue-gray"
                                />
                              </IconButton>
                            </Badge>
                          </>
                        )}
                      </>
                      <>
                        {!includes(selectedIcons, icon) && (
                          <IconButton onClick={() => onIconClick(icon)}>
                            <DynamicHeroIcon
                              icon={icon || "Squares2X2Icon"}
                              className="h-8 w-8 text-blue-gray"
                            />
                          </IconButton>
                        )}
                      </>
                    </div>
                  );
                })}
            </div>
          </CardBody>
          <CardFooter>
            <Button color="blue" onClick={saveData}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
