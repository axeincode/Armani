/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { get, isEmpty } from "lodash";
import { generateColumns } from "./helper.utils";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // @ts-ignore
  interface TableMeta {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown,
      originalRow: unknown
    ) => void;
  }
}

// outside component
const EmptyArray: any = [];

// Give our default column cell renderer editing superpowers!
const DefaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // @ts-ignore
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value, original);
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
  data: any;
};

export default function ReactTableViewWidget(props: ReactTableWidgetProps) {
  const { data } = props;
  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => (!isEmpty(data) ? generateColumns(data) : EmptyArray),
    [data]
  );

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
      updateData: (rowIndex, columnId, value, originalRow) => {
        // Skip page index reset until after next rerender
        const originalRowId = get(originalRow, "id");
        skipAutoResetPageIndex();
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
                          <>
                            <div className="flex font-normal leading-none opacity-70 gap-2">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          </>
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
                    className={cn(
                      "bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-10"
                    )}
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <td
                          key={cell.id}
                          className="p-4 border-b border-blue-gray-100"
                          style={{
                            ...(row.depth && {
                              paddingLeft: `${row.depth * 2}rem`,
                            }),
                          }}
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
