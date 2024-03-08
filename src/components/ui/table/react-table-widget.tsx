/* eslint-disable react-hooks/rules-of-hooks */
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
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { makeData, Person } from "./makeData";
import { useVirtualizer } from "@tanstack/react-virtual";
import { WidgetTypes } from "@/types/editor.types";
import { isEmpty } from "lodash";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// outside component
const EmptyArray: any = [];

// Give our default column cell renderer editing superpowers!
const DefaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // @ts-ignore
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    // @ts-ignore
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <div className="max-w-[60px]">
        <input
          className="p-0 max-w-[60px]"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </div>
    );
  },
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export type ReactTableWidgetProps = {
  data: any[];
  columns: ColumnDef<any>[];
};

export default function ReactTableWidget(props: ReactTableWidgetProps) {
  const { data: tableWidgetData, columns } = props;
  const rerender = React.useReducer(() => ({}), {})[1];
  console.log("ReactTableWidget table widget");

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(tableWidgetData);
  const refreshData = () => setData(() => makeData(10, 5, 3));
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: data || EmptyArray,
    columns: columns,
    defaultColumn: DefaultColumn,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row: any) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div
      className="relative h-[600px] min-w-full overflow-x-hidden overflow-y-auto"
      ref={tableContainerRef}
    >
      <div className="flex w-44 gap-2">
        <Button
          variant="outlined"
          size="sm"
          color="blue"
          fullWidth
          className="text-xs px-0"
          onClick={() => {}}
        >
          + Row
        </Button>
        <Button
          variant="outlined"
          size="sm"
          color="blue"
          fullWidth
          className="text-xs px-0"
          onClick={() => {}}
        >
          + Col
        </Button>
        <Button
          variant="outlined"
          size="sm"
          color="green"
          fullWidth
          className="text-xs px-0"
          onClick={() => {}}
        >
          Save
        </Button>
      </div>
      <div className="min-w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <table className="min-w-full text-left text-sm font-light dark:border-neutral-500 border border-blue-gray-100">
            <thead className="border-b font-medium dark:border-neutral-500">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        {header.isPlaceholder ? null : (
                          <div className="font-normal leading-none opacity-70">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<any>;
                return (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <td
                          key={cell.id}
                          className="p-4 border-b border-blue-gray-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
