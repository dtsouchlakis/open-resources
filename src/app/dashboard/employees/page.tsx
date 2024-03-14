"use client";
import Drawer from "../../components/Drawer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, GridOptions } from "ag-grid-community";
import { useEffect, useMemo, useState } from "react";
import PinnedItem from "@/app/components/PinnedItem";
import { PencilIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import CustomDialog, { useDialog } from "@/app/components/CustomDialog";
import { useForm } from "react-hook-form";
import { Employee } from "@/app/models/employee";
import { User } from "@/app/models/user";
import axios, { AxiosResponse } from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { removeNulls } from "@/app/utils/data.utils";
import EmployeeLinkForm from "@/app/components/EmployeeLinkForm";
import { useTheme } from "@/app/lib/ThemeProvider";

export default function Users() {
  const [employees, setEmployees] = useState<User[]>([]);
  const dialog = useDialog<User>({});
  const confirmDialog = useDialog<Employee>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { theme } = useTheme();

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm<User>({ defaultValues: { employee: {} } });

  async function init() {
    const _users = await axios.get<User[]>("/api/user", {
      params: {
        include: "employee",
      },
    });

    setEmployees(_users.data);
  }

  const handleOpenConfirmDialog = (employee: Employee) => {
    confirmDialog.openModal({
      ...employee,
    });
  };

  useEffect(() => {
    init();
  }, []);

  const colDefs: ColDef<any>[] = [
    {
      headerName: "Actions",
      width: 100,
      filter: false,
      sortable: false,
      pinned: "left",
      resizable: false,
      headerTooltip: "Edit or delete",
      cellClass: "overflow-visible",
      cellStyle: { overflow: "visible" },
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-row gap-2 items-center justify-center overflow-visible ">
            <Tooltip content="Edit user's employee record">
              {params.data.employee && (
                <PencilIcon
                  className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 "
                  onClick={(item) => {
                    console.log(params.data, "data");
                    handleOpenDialog(params.data);
                  }}
                />
              )}
            </Tooltip>
            <Tooltip content="Link or unlink user as employee">
              <LinkIcon
                className="w-6 h-6 text-blue-500 cursor-pointer"
                onClick={(item) => {
                  console.log(params.data, "data");
                  params.data.employee
                    ? handleOpenConfirmDialog(params.data.employee)
                    : handleOpenDialog(params.data);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      headerName: "Username",
      field: "name",
    },
    {
      headerName: "Age",
      field: "employee.age",
    },
    {
      headerName: "Address",
      field: "employee.address",
    },
    {
      headerName: "Start Date",
      field: "employee.hiredAt",
    },
    {
      headerName: "Leaving Date",
      field: "employee.lastDayWorkedAt",
    },
    {
      headerName: "Role",
      field: "employee.title",
    },
  ];

  async function onDoUnlink() {
    if (!confirmDialog.data) return;
    const res = await axios.delete(`/api/employee/${confirmDialog.data.id}`, {
      params: {
        where: `id:${confirmDialog.data.id}`,
      },
    });
    confirmDialog.closeModal();
    init();
  }
  const handleOpenDialog = (data: User | undefined) => {
    console.log(data, "data");
    console.log(dialog.data);

    dialog.openModal({ ...data });
    console.log(getValues());
  };

  async function onCreate() {
    console.log(errors);

    if (Object.keys(errors).length != 0) return;
    const _formVals = getValues();
    let formVals = removeNulls(_formVals);
    let userVals = {};

    userVals = {
      name: formVals?.employee?.firstName + " " + formVals?.employee?.lastName,
      email: formVals?.employee?.email,
    };

    const res = await axios.post("/api/employee", {
      ...formVals.employee,
      user: {
        create: { ...userVals },
      },
    });

    onResetDialog();
    init();
  }

  function selectCallback(inputValue: string, name: string) {
    console.log(inputValue, name);
    let res;
    if (name === "employee.department") {
      res = axios.get(`/api/department`, {
        params: {
          where: `name.startsWith:${inputValue}`,
        },
      });
    } else if (name === "employee.manager") {
      console.log("manager", inputValue);

      res = axios.get(`/api/user`, {
        params: {
          where: `name.startsWith:${inputValue}`,
        },
      });
    } else if (name === "employee.Company") {
      res = axios.get(`/api/company`, {
        params: {
          where: `name.startsWith:${inputValue}`,
        },
      });
    }
    return res
      ? res
      : new Promise<AxiosResponse<any, any>>((resolve, reject) => {});
  }
  async function onSubmit() {
    if (!dialog.data?.id) {
      onCreate();
      return;
    }
    console.log(getValues(), "submit");
    if (Object.keys(errors).length != 0) return;
    const _formVals = getValues();
    if (_formVals && _formVals?.employee?.userId) {
      _formVals.employee.userId = undefined;
    }
    let formVals = removeNulls(_formVals);

    const res = await axios.put(
      "/api/user",
      {
        employee: {
          upsert: {
            create: {
              ...formVals,
            },

            update: {
              ...formVals,
            },
          },
        },
      },

      {
        params: {
          where: `id:${dialog.data?.id}`,
        },
      }
    );

    onResetDialog();
    init();
  }

  useEffect(() => {
    if (!dialog.data) return;
    console.log(dialog.data, "dialog");

    reset({
      ...dialog.data,
    });
  }, [dialog.data]);

  function onResetDialog() {
    dialog.data = undefined;
    dialog.closeModal();
    confirmDialog.closeModal();
    reset({});
    console.log(dialog.data, "dialog.data");
  }

  const table = useMemo(() => {
    return (
      <AgGridReact
        columnDefs={colDefs}
        rowData={employees}
        gridOptions={gridOptions}
        className={`w-full h-full mt-4 pb-12 ${
          theme == "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
        }`}
      />
    );
  }, [theme, employees]);
  return (
    <Drawer className="flex w-full justify-center ">
      <CustomDialog
        dialogHandler={confirmDialog}
        className="dark:bg-gray-800"
        title="Are you sure?"
        mode="save"
        onClose={() => {}}
        onSubmit={onDoUnlink}
        onCancel={() => {
          onResetDialog();
        }}
      >
        <div>
          <p>
            Are you sure you want to unlink{" "}
            {`${confirmDialog.data?.firstName} ${confirmDialog.data?.lastName}`}{" "}
            from their employee record?
          </p>
        </div>
      </CustomDialog>
      <CustomDialog
        dialogHandler={dialog}
        title="link employee"
        mode="save"
        size="4xl"
        className="bg-gray-800 w-full  transform rounded-2xl  p-6 text-left align-middle shadow-xl transition-all"
        onClose={onResetDialog}
        onSubmit={onSubmit}
        onCancel={onResetDialog}
      >
        <EmployeeLinkForm
          dialog={dialog}
          selectedUser={dialog.data}
          control={control}
          errors={errors}
          fetchCallback={selectCallback}
        />
      </CustomDialog>
      <PinnedItem className=" w-full flex-grow pb-12 flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 h-10 px-4 rounded mt-6 relative"
          onClick={() => {
            handleOpenDialog(undefined);
          }}
        >
          Add Employee
        </button>
        {table}
      </PinnedItem>
    </Drawer>
  );
}

//TODO: Make all IDs such as subordinate id etc to actual selectors
