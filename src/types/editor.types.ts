import { values } from "lodash";
import { denormalize, normalize, schema } from "normalizr";

export type ElementTypes = {
  id: string;
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

export type WidgetTypes = {
  id: string;
  name: string;
  elements: string[] | null | [];
};

export type PageTypes = {
  id: string;
  pageNumber: number;
  pageName: string;
  order: number;
  title: string;
  subtitle: string;
  widgets: string[] | [];
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
  logo: string;
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
  pages: string[] | [];
};

export type EditorSubjectTypes = {
  decks: Record<string, DeckInfoTypes>;
  pages: Record<string, PageTypes>;
  widgets: Record<string, WidgetTypes>;
  elements: Record<string, ElementTypes>;
};

export type EditorStateTypes = {
  entities: EditorSubjectTypes;
  result: {
    decks: string[];
    pages: string[];
    widgets: string[];
    elements: string[];
  };
};

// Define schemas
const element = new schema.Entity("elements");
const widget = new schema.Entity("widgets", {
  elements: [element],
});

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
    elements: entities.elements ? Object.keys(entities.elements) : [],
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
