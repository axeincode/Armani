import { normalize, schema } from "normalizr";
export type WidgetElementType = {
  transformation: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  elementName: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  captionSubTitle?: string;
  captionTitle?: string;
};

export type WidgetType = {
  elements: {
    [elementId: string]: WidgetElementType;
  };
};

export type editorPageType = {
  [pageId: string]: {
    widgets: {
      [widgetId: string]: WidgetType;
    };
  };
};

// Initial state
const widgetInitialState = {
  editorPage: {
    pageId: {
      widgets: {
        widgetId: {
          elements: {
            elementId: {
              transformation: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
              },
              elementName: "Element Name",
            },
          },
        },
      },
    },
  },
};

// Define schemas
const element = new schema.Entity("elements");
const widgets = new schema.Entity("widgets", {
  elements: [element],
});

const page = new schema.Entity("pages", { widgets: [widgets] });
const editorSchema = { pages: [page] };

/** transformation */
// Transform the normalized data to the desired structure
const transformNormalizedData = (normalizedData: any) => {
  const transformedData = {
    pages: {
      byId: {},
      allIds: [],
    },
    widgets: {
      byId: {},
      allIds: [],
    },
    elements: {
      byId: {},
      allIds: [],
    },
  };

  const transformEntity = (entity: any, type: any) => {
    const byId = {};
    const allIds = Object.keys(entity).map((id) => {
      // @ts-ignore
      byId[id] = entity[id];
      return id;
    });

    // @ts-ignore
    transformedData[type].byId = byId;
    // @ts-ignore
    transformedData[type].allIds = allIds;
  };

  transformEntity(normalizedData.entities.pages, "pages");
  transformEntity(normalizedData.entities.widgets, "widgets");
  transformEntity(normalizedData.entities.elements, "elements");

  return transformedData;
};

// Normalize the state
export const normalizedEditorData = (editordata: any) =>
  normalize(editordata, editorSchema);
