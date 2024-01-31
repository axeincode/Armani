"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  //CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

// import { type User, fakeData, usStates } from './makeData';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

export const EditableTable = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, any>>({});

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "email",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "state",
        header: "State",
        editVariant: "select",
        editSelectOptions: [],
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
    ],
    [editedUsers, validationErrors]
  );

  //CREATE action
  const handleCreateUser: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUsers = async () => {
    setEditedUsers({});
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      //deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: [],
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "cell", // ('modal', 'row', 'table', and 'custom' are also available)
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    //getSubRows: (row) => fakeData.filter((r) => r.id === row.id),
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveUsers}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        ></Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    // state: {
    //   isLoading: isLoadingUsers,
    //   isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
    //   showAlertBanner: isLoadingUsersError,
    //   showProgressBars: isFetchingUsers,
    // },
  });

  return <MaterialReactTable table={table} />;
};
