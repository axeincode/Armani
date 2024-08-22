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
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SquaresPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useVirtualizer } from "@tanstack/react-virtual";
import { WidgetTypes } from "@/types/editor.types";
import { get, isEmpty } from "lodash";
import { AddColumnHelper } from "./add-column-helper";
import { generateColumns } from "./helper.utils";
import { ChevronDown, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 } from "uuid";

declare module "@tanstack/react-table" {
  // @ts-ignore
  interface TableMeta<TData extends RowData> {
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
  data: any[];
  handeOnSave: (data: any) => void;
};

export default function ReactTableWidget(props: ReactTableWidgetProps) {
  const { data: tableWidgetData, handeOnSave } = props;

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(tableWidgetData);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => (!isEmpty(data) ? generateColumns(data) : EmptyArray),
    [data]
  );

  const handleOnTableSave = React.useCallback(() => {
    handeOnSave(data);
  }, [data]);

  const handleOnAddColumn = React.useCallback(
    (name: string) => {
      if (!isEmpty(data)) {
        const newData = data.map((row) => {
          return {
            ...row,
            [name]: "random value",
          };
        });
        setData(newData);
      }
    },
    [data]
  );

  const handleOnDeleteCol = React.useCallback(
    (colName: string | any) => {
      // @ts-ignore
      // const colName = colNameFunc && colNameFunc();
      if (!isEmpty(data)) {
        const newData = data.map((row) => {
          const { [colName]: _, ...rest } = row;
          return rest;
        });
        setData(newData);
      }
    },
    [data]
  );

  const handleOnAddRow = React.useCallback(() => {
    // create a object based on reading columns names
    const newRow = columns.reduce((acc, col) => {
      acc[col.id as string] = "random value";
      return acc;
    }, {} as any);
    setData((old) => [...old, { ...newRow, id: v4() }]);
  }, [columns]);

  const handleOnAddSubRow = React.useCallback(
    (rowid: string) => {
      if (!isEmpty(data)) {
        const newRow = columns.reduce((acc, col) => {
          acc[col.id as string] = "random value";
          return acc;
        }, {} as any);

        const newData = data.map((row) => {
          if (row.id !== rowid) {
            return row;
          }
          const subRows = row?.subRows || [];
          return {
            ...row,
            subRows: [
              ...subRows,
              {
                id: v4(),
                ...newRow,
              },
            ],
          };
        });
        setData(newData);
      }
    },
    [data, columns]
  );

  const handleOnDeleteRow = React.useCallback(
    (rowid: string) => {
      if (!isEmpty(data)) {
        const newData = data.filter((row) => row.id !== rowid);
        setData(newData);
        // update if any subrows matches the original row id
        setData((old) =>
          old.map((row, index) => {
            if (row.subRows && Array.isArray(row.subRows)) {
              const subRows = row.subRows.filter(
                (subRow: any) => subRow.id !== rowid
              );
              return {
                ...row,
                subRows,
              };
            }
            return row;
          })
        );
      }
    },
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
        if (originalRowId) {
          setData((old) =>
            old.map((row, index) => {
              if (row.id === originalRowId) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            })
          );
          // update if any subrows matches the original row id
          setData((old) =>
            old.map((row, index) => {
              if (row.subRows && Array.isArray(row.subRows)) {
                const subRows = row.subRows.map((subRow: any) => {
                  if (subRow.id === originalRowId) {
                    return {
                      ...subRow,
                      [columnId]: value,
                    };
                  }
                  return subRow;
                });
                return {
                  ...row,
                  subRows,
                };
              }
              return row;
            })
          );
        }
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
          onClick={handleOnAddRow}
        >
          + Row
        </Button>
        <AddColumnHelper onAdd={handleOnAddColumn} />
        <Button
          variant="outlined"
          size="sm"
          color="green"
          fullWidth
          className="text-xs px-0"
          onClick={handleOnTableSave}
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
                          <>
                            <div className="flex font-normal leading-none opacity-70 gap-2">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <XCircleIcon
                                className="h-4 w-4  cursor-pointer"
                                onClick={() => {
                                  handleOnDeleteCol(
                                    header.column.columnDef.id as string
                                  );
                                }}
                              />
                            </div>
                          </>
                        )}
                      </th>
                    );
                  })}
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<any>;
                const cellVisibles = row.getVisibleCells();
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
                    <td className="p-4 border-b border-blue-gray-100">
                      <div className="flex gap-2">
                        <>
                          {!row.id.includes(".") && (
                            <>
                              <SquaresPlusIcon
                                className="h-4 w-4 text-gray-600 cursor-pointer"
                                title="add subrows"
                                onClick={() =>
                                  handleOnAddSubRow(row.original.id as string)
                                }
                              />
                            </>
                          )}

                          <XCircleIcon
                            className="h-4 w-4  cursor-pointer"
                            title="delete row"
                            onClick={() => {
                              handleOnDeleteRow(row.original.id as string);
                            }}
                          />
                          {!row.id.includes(".") && row.getCanExpand() && (
                            <>
                              {row.getIsExpanded() ? (
                                <>
                                  <ChevronUpIcon
                                    className="h-4 w-4 text-gray-600 cursor-pointer"
                                    onClick={row.getToggleExpandedHandler()}
                                  />
                                </>
                              ) : (
                                <>
                                  <ChevronDownIcon
                                    className="h-4 w-4 text-gray-600 cursor-pointer"
                                    onClick={row.getToggleExpandedHandler()}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    </td>
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
