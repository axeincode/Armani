import { ColumnDef } from "@tanstack/react-table";
import { v4 } from "uuid";

export const EmptyArray: any = [];
// create empty rows and colums data as fallback
export const makeData = (len = 2) =>
  Array.from({ length: len }, (_, i) => ({
    id: v4(),
    col1: `col1`,
    col2: `col2`,
  }));

export const generateColumns = (data: any[]): ColumnDef<any>[] => {
  // Assuming `data` is an array of objects and the keys of the first object are the column keys
  const keys = Object.keys(data[0]);
  // remove/hide column with key 'id'
  const index = keys.indexOf("id");
  if (index > -1) {
    keys.splice(index, 1);
  }

  const subRowIndex = keys.indexOf("subRows");
  if (subRowIndex > -1) {
    keys.splice(subRowIndex, 1);
  }

  return keys.map((key) => ({
    accessorKey: key,
    header: () => key, // Use the key itself as the header
    footer: (props: any) => props.column.id,
    id: key, // Use the key as the column id
    // /cell: (info: any) => info.row.original[key], // Get the value of the corresponding key from the row data
  }));
};
