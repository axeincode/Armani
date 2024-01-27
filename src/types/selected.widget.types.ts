import { WidgetEnum } from "./widgets";

export type SelectedState = {
  widget: WidgetEnum | null;
  error?: string;
  id: string;
};
