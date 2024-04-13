import { get, isEmpty, map } from "lodash";
import React from "react";
import { Chrono } from "react-chrono";
import datad from "./data";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";

export interface TimelineComponentProps {
  data?: any;
}

export const TimelineComponent = ({ data }: TimelineComponentProps) => {
  const [items, setItems] = React.useState<TimelineItemModel[]>([
    {
      title: "May 1945",
      cardTitle: "Dunkirk",
    },
  ]);
  const [updateCount, setUpdateCount] = React.useState(0);

  React.useEffect(() => {
    const timelineData = get(data, "data", []);
    const itemData = map(timelineData, (item) => {
      return {
        title: item.key,
        cardTitle: item.key,
        url: "",
        media: {
          name: item.key,
          source: {
            url: "https://i2-prod.mirror.co.uk/incoming/article10847802.ece/ALTERNATES/s810/PAY-Dunkirk-in-colour.jpg",
          },
          type: "IMAGE",
        },
        // date: "1945-05-01",
        cardSubtitle: item.key,
        cardDetailedText: [""],
      } as TimelineItemModel;
    });
    setItems(itemData);
    setUpdateCount((prev) => prev + 1);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div key={updateCount} className="w-full h-full">
        <Chrono
          key={updateCount}
          items={items}
          mode="HORIZONTAL"
          cardLess
          contentDetailsHeight={250}
          fontSizes={{
            title: "1rem",
          }}
        />
      </div>
    </div>
  );
};

/**
 * {
  "primary": "#253E66",
  "secondary": "#EF6555"
}
 */
