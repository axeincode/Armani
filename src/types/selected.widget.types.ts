import { WidgetTypes } from "./widgets";

export type SelectedState = {
  widget: WidgetTypes | null;
  error?: string;
};
