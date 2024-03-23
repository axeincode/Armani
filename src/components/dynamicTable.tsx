// @ts-nocheck
// @ts-expect-error
"use client";
import React, { useState, FC } from "react";
import { useReactTable, useSortBy, useFilters } from "@tanstack/react-table";

type DynamicTableProps = {
  data: {
    rows: Record<string, string>[] | [];
    columns: Record<string, string>[] | [];
  };
};

export const DynamicTable: FC<DynamicTableProps> = (props) => {
  const initColumns = props?.data?.columns || [];
  const initRows = props?.data?.rows || [];
  const [columns, setColumns] = useState(initColumns);
  const [rows, setRows] = useState(initRows);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const addColumn = () => {
    const newColumn = {
      Header: `Column ${columns.length + 1}`,
      accessor: `col${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);

    // Add default values for the new column to existing rows
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, [`col${columns.length + 1}`]: "" }))
    );
  };

  const addRow = () => {
    const newRow = {};
    columns.forEach((column) => {
      newRow[column.accessor] = "";
    });
    setRows([...rows, newRow]);
  };

  const handleCellValueChange = (rowIndex, columnName, value) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex ? { ...row, [columnName]: value } : row
      )
    );
  };
  const handleCellValueChangeColumn = (columnIndex: any, value: any) => {
    const valueq = columns[columnIndex];
    columns[columnIndex]["Header"] = value;
    setColumns([...columns]);
  };
  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };
  const deleteColumn = (index) => {
    setColumns((prevColumns) => prevColumns.filter((_, i) => i !== index));
    setRows((prevRows) =>
      prevRows.map((row) => {
        const newRow = { ...row };
        delete newRow[`col${index + 1}`];
        return newRow;
      })
    );
  };

  const data = React.useMemo(() => rows, [rows]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
    state,
  } = useReactTable({ columns, data }, useFilters, useSortBy);

  return (
    <>
      <div className="p-4">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={toggleDropdown}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  addColumn();
                  toggleDropdown();
                }}
              >
                Add Column
              </button>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  addRow();
                  toggleDropdown();
                }}
              >
                Add Row
              </button>
            </div>
          )}
        </div>
        <table
          {...getTableProps()}
          className="min-w-full border border-gray-300"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup?.id}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    // @ts-ignore
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`py-2 px-4 bg-gray-200 border-b`}
                  >
                    <div className="flex flex-row space-between">
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                      &nbsp; &nbsp;
                      <span>
                        <input
                          type="text"
                          className="peer bg-transparent"
                          value={column["Header"]}
                          onChange={(e) =>
                            handleCellValueChangeColumn(
                              colIndex,
                              e.target.value
                            )
                          }
                        />
                      </span>
                      <span>
                        <button
                          className="ml-2 text-red-500"
                          onClick={() => deleteColumn(colIndex)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6"
                          >
                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                            <path
                              fill-rule="evenodd"
                              d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </th>
                ))}
                <th className="py-2 px-4 bg-gray-200 border-b">Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {tableRows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  // @ts-ignore
                  key={row.id}
                  {...row.getRowProps()}
                  className={Number(row.original.age) > 28 ? "font-bold" : ""}
                >
                  {row.cells.map((cell, colIndex) => (
                    <td key={cell.value} className="py-2 px-4 border-b">
                      <input
                        type="text"
                        className="peer w-full h-full bg-transparent"
                        value={cell.value}
                        onChange={(e) =>
                          handleCellValueChange(
                            row.index,
                            columns[colIndex].accessor,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="text-red-500"
                      onClick={() => deleteRow(rowIndex)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                        class="w-6 h-6"
                      >
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path
                          fill-rule="evenodd"
                          d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
