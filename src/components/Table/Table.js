import React, { useState, useRef, useEffect, useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ActionRenderer } from "../../utils/CustomCellRenderer";
//Component to show table for cafe and employee list
const Table = ({ tableData, tableColumns, isEditDisable = false, onEdit, onDelete, onEmpClick, loading }) => {
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      wrapText: true,
      autoHeight: true
    }),
    []
  );

  //Append action custom column to the table
  useEffect(() => {
    let _cols = tableColumns?.length
      ? [
          ...tableColumns,
          {
            field: "action",
            cellRenderer: ActionRenderer,
            cellRendererParams: {
              isEditDisable: isEditDisable,
              clicked: function (id, type) {
                if (type === "edit") {
                  onEdit(id);
                } else if (type === "delete") {
                  onDelete(id);
                }
              },
            },
          },
        ]
      : [];
    setColumnDefs(_cols);
  }, [tableColumns, onEdit, onDelete, isEditDisable]);

  //Refresh cells when edit is enabled or disabled
  useEffect(() => {
    if (!gridRef) return;
    if (!gridRef.current) return;
    if (!gridRef.current.api) return;
    gridRef.current.api.refreshCells();
  }, [isEditDisable]);

  return (
    <div className="ag-theme-alpine mt-3">
      {loading ? (
        <Stack direction="row" spacing={2} className="mt-3">
          <Skeleton variant="rectangular" width={"10%"} height={250} />
          <Skeleton variant="rectangular" width={"15%"} height={250} />
          <Skeleton variant="rectangular" width={"100%"} height={250} />
          <Skeleton variant="rectangular" width={"20%"} height={250} />
          <Skeleton variant="rectangular" width={"20%"} height={250} />
          <Skeleton variant="rectangular" width={"20%"} height={250} />
        </Stack>
      ) : (
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={defaultColDef}
          animateRows={true}
          enableCellChangeFlash={true}
        />
      )}
    </div>
  );
};

export default Table;
