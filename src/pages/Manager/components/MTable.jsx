import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, useTheme } from "@mui/material";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "full_name", headerName: "Full name", width: 130 },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    renderCell: (params) => {
      console.log(params.value);
      return <Chip variant="contained" label={params.value}></Chip>;
    },
  },
];

export default function MTable({ data }) {
  const theme = useTheme()
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: `${theme?.alpha?.black[10]}` }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
