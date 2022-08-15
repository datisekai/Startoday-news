import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { primary, secondary } from "../theme/themeColors";

interface TableProps {
  columns: any[];
  rows: any[];
  perpage?: number;
  page?: number;
  loading?: boolean;
  handleSelected: Function;
}

const MDataGrid: FC<TableProps> = ({
  columns,
  rows,
  page,
  perpage = 5,
  handleSelected,
  loading,
}) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        checkboxSelection
        sx={{
          bgcolor: primary[100],
          "& .css-1p57nfw-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-1p57nfw-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
            {
              color: secondary.main,
            },
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          "& .css-17i0ij5-MuiDataGrid-root .MuiDataGrid-menuIcon": {
            width: "15px",
            visibility: "visible",
          },
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

          handleSelected(selectedRows);
        }}
        columns={columns}
        loading={loading}
        pageSize={perpage}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
        rows={rows}
      />
    </div>
  );
};

export default MDataGrid;
