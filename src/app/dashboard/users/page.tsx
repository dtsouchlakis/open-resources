"use client";
import Drawer from "../../components/Drawer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, GridOptions } from "ag-grid-community";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<any>([]);
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
  async function init() {
    const _users = await fetch("/api/user?name=Dionysios Tsouchlakis", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(_users);

    const usersJson = await _users.json();
    setUsers(usersJson);
    console.log(usersJson);
  }

  useEffect(() => {
    init();
  }, []);
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
