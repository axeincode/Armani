import { values } from "lodash";
import { denormalize, normalize, schema } from "normalizr";
import { WidgetEnum as KWidgetTypes } from "./widgets";

export type WidgetElementTypes = {
  id: string;
  name: string;
  url: string;
};

export type WidgetImageTypes = {
  id: string;
  name: string;
  url: string;
};

export type WidgetTypes = {
  id: string;
  type: KWidgetTypes;
  transformation: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  title?: string;
  subtitle?: string;
  captionEnabled: boolean;
  captionSubtitle?: string;
  captionTitle?: string;
  //  images
  images: WidgetImageTypes[];
};

export type PageTypes = {
  id: string;
  pageNumber: number;
  pageName: string;
  order: number;
  title: string;
  subtitle: string;
  widgets: string[] | null;
};

export type DeckInfoTypes = {
  id: string;
  background: string;
  sidebar: string;
  fontFamily: string;
  shadow: string;
  title: string;
  subtitle: string;
  visits: {
    total: number;
    last7Days: number;
    last30Days: number;
  };
  coverPhoto: string;
  logo?: {
    name: string;
    url: string;
  };
  disclaimer: {
    enabled: boolean;
    title: string;
    description: string;
  };
  nda: {
    enabled: boolean;
    title: string;
    askFor: string;
    description: string;
  };
  pages?: string[];
};

export type EditorSubjectTypes = {
  decks: Record<string, DeckInfoTypes>;
  pages: Record<string, PageTypes>;
  widgets: Record<string, WidgetTypes>;
};

export type EditorStateTypes = {
  entities: EditorSubjectTypes;
  result: {
    decks: string[];
    pages: string[];
    widgets: string[];
  };
};

// Define schemas
const widget = new schema.Entity("widgets", {}, { idAttribute: "id" });

const page = new schema.Entity("pages", { widgets: [widget] });
const deck = new schema.Entity("decks", { pages: [page] });

const appDataSchema = [deck];
const editorSchema = deck;

/** transformation */
// Transform the normalized data to the desired structure
const transformNormalizedData = (
  deNormalizedData: any,
  schema: any
): EditorStateTypes => {
  const { entities } = normalize(deNormalizedData, schema);
  const results = {
    decks: entities.decks ? Object.keys(entities.decks) : [],
    pages: entities.pages ? Object.keys(entities.pages) : [],
    widgets: entities.widgets ? Object.keys(entities.widgets) : [],
  };

  return {
    entities: entities as EditorSubjectTypes,
    result: results,
  };
};

// Normalize the state
export const normalizedAppData = (editordata: any): EditorStateTypes =>
  transformNormalizedData(editordata, appDataSchema);

export const normalizedEditorData = (editordata: any): EditorStateTypes =>
  transformNormalizedData(editordata, editorSchema);

export const deNormalizeEditorData = (editorState: EditorStateTypes): any => {
  const { entities } = editorState;
  const { decks } = entities;
  // get deckid from decks
  const deckId = values(decks)[0].id;
  if (!deckId) throw new Error("Deck id not found");
  const deNormData = denormalize(deckId, editorSchema, entities);
  return deNormData;
};
