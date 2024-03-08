import React from "react";
import { IconButton, Button } from "@material-tailwind/react";
import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  RowData,
  Row,
} from "@tanstack/react-table";
import { useDeepCompareEffect } from "react-use";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { WidgetTypes } from "@/types/editor.types";
import { isEmpty, isEqual, get } from "lodash";
import ReactTableWidget from "./react-table-widget";

export type ReactTableWidgetProps = {
  data: WidgetTypes;
};

const EmptyArray: any = [];
// create empty rows and colums data as fallback
const makeData = (len = 2) =>
  Array.from({ length: len }, (_, i) => ({
    id: i,
    firstName: `firstName ${i}`,
    lastName: `lastName ${i}`,
    age: Math.floor(Math.random() * 100),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5,
  }));

const generateColumns = (data: any[]): ColumnDef<any>[] => {
  // Assuming `data` is an array of objects and the keys of the first object are the column keys
  const keys = Object.keys(data[0]);
  // remove/hide column with key 'id'
  const index = keys.indexOf("id");
  if (index > -1) {
    keys.splice(index, 1);
  }

  return keys.map((key) => ({
    accessorKey: key,
    header: () => key, // Use the key itself as the header
    footer: (props: any) => props.column.id,
    // /cell: (info: any) => info.row.original[key], // Get the value of the corresponding key from the row data
  }));
};

const MemoziedTableWidget = (props: ReactTableWidgetProps) => {
  const { data: widgetData } = props;
  let tableData = get(widgetData, "tableData", []);

  console.log("table data given", tableData);
  if (isEmpty(tableData)) {
    tableData = makeData() as unknown as any[];
  }

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => (!isEmpty(tableData) ? generateColumns(tableData) : EmptyArray),
    [tableData]
  );

  console.log("Memoized table widget", tableData, columns);
  return (
    <ReactTableWidget
      columns={columns || EmptyArray}
      data={tableData}
      // Other props...
    />
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  return isEqual(prevProps.data, nextProps.data);
};

export default React.memo(MemoziedTableWidget, areEqual);
