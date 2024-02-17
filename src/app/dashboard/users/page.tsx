"use client";
import Drawer from "../../components/Drawer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, GridOptions } from "ag-grid-community";

export default function Users() {
  const gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    autoSizeStrategy: {
      type: "fitGridWidth",
    },
  };

  const colDefs: ColDef<any>[] = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Age",
      field: "age",
    },
    {
      headerName: "Address",
      field: "address",
    },
    {
      headerName: "Start Date",
      field: "startDate",
    },
    {
      headerName: "Leaving Date",
      field: "endDate",
    },
    {
      headerName: "Role",
      field: "role",
    },
  ];

  const rowData = [{ name: "John" }, { name: "Jane" }];
  return (
    <Drawer>
      <div className="w-full h-full flex flex-col justify-center items-center p-3">
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          gridOptions={gridOptions}
          className="ag-theme-quartz w-full h-full p-3"
        />
      </div>
    </Drawer>
  );
}
