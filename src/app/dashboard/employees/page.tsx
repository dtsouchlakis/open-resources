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
  const editDialog = useDialog<User>({});
  const linkDialog = useDialog<User>({});
  const createDialog = useDialog<User>({});
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
    //TODO: Just pass whole form
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm<User>({ defaultValues: { employee: {} }, mode: "all" });

  async function init() {
    const _users = await axios.get<User[]>("/api/user", {
      params: {
        include: "employee",
      },
    });

    setEmployees(_users.data);
  }

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
                    handleOpenDialog(params.data);
                  }}
                />
              )}
            </Tooltip>
            <Tooltip content="Link or unlink user as employee">
              <LinkIcon
                className="w-6 h-6 text-blue-500 cursor-pointer"
                onClick={(item) => {
                  console.log(params.data, "link");

                  handleOpenDialog(
                    params.data,
                    params.data.employee ? "unlink" : "link"
                  );
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
    const res = await axios.delete(`/api/employee/${confirmDialog.data.id}`);
    confirmDialog.closeModal();
    init();
  }
  const handleOpenDialog = (data: User | undefined, mode: string = "edit") => {
    console.log(data, mode);

    if (mode === "edit") {
      editDialog.openModal({ ...data });
    } else if (mode === "link") {
      linkDialog.openModal({ ...data });
    } else if (mode === "create") {
      createDialog.openModal({ ...data });
    } else if (mode === "unlink") {
      confirmDialog.openModal(data?.employee);
    }
    reset({
      //TODO: Find a better way to handle this, preferably inside the form
      employee: {
        ...data?.employee,
      },
    });
    console.log(editDialog.data, linkDialog.data, createDialog.data, "dialog");
  };

  async function onCreate() {
    console.log(errors, "errors");

    if (Object.keys(errors).length != 0) return;

    const res = await axios.post("/api/employee", {
      ...getValues().employee,
    });

    onResetDialog();
    init();
  }

  function onResetDialog() {
    reset();
    createDialog.closeModal();
    editDialog.closeModal();
    linkDialog.closeModal();
    confirmDialog.closeModal();
  }
  async function onEdit() {
    const _formVals = getValues();
    let formVals = removeNulls(_formVals);
    const res = await axios.put(
      `/api/employee/${editDialog.data?.employee?.id}`,
      {
        ...formVals.employee,
      }
    );
    onResetDialog();
    init();
  }

  function selectCallback(inputValue: string, name: string) {
    let res;
    if (name === "employee.department") {
      res = axios.get(`/api/department`, {
        params: {
          where: `name.startsWith:${inputValue}`,
        },
      });
    } else if (name === "employee.manager") {
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

  async function onLink() {
    if (Object.keys(errors).length != 0) return;
    const _formVals = getValues();
    let formVals = removeNulls(_formVals);
    const res = await axios.post(`/api/employee/`, {
      ...formVals.employee,
      user: {
        connect: {
          id: linkDialog.data?.id,
        },
      },
    });
    onResetDialog();
    init();
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
        className="dark:bg-gray-800 bg-white w-full text-black dark:text-white  transform rounded-2xl  p-6 text-left align-middle shadow-xl transition-all"
        title="Are you sure?"
        mode="save"
        onClose={() => {}}
        onSubmit={onDoUnlink}
        onCancel={onResetDialog}
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
        dialogHandler={editDialog}
        title="link employee"
        mode="save"
        size="4xl"
        className="dark:bg-gray-800 bg-white w-full text-black dark:text-white  transform rounded-2xl  p-6 text-left align-middle shadow-xl transition-all"
        onClose={onResetDialog}
        onSubmit={onEdit}
        onCancel={onResetDialog}
      >
        <EmployeeLinkForm
          dialog={editDialog}
          selectedUser={editDialog.data}
          control={control}
          errors={errors}
          fetchCallback={selectCallback}
        />
      </CustomDialog>
      <CustomDialog
        dialogHandler={linkDialog}
        title="link employee"
        mode="save"
        size="4xl"
        className="dark:bg-gray-800 bg-white w-full text-black dark:text-white  transform rounded-2xl  p-6 text-left align-middle shadow-xl transition-all"
        onClose={onResetDialog}
        onSubmit={onLink}
        onCancel={onResetDialog}
      >
        <EmployeeLinkForm
          dialog={linkDialog}
          selectedUser={linkDialog.data}
          control={control}
          errors={errors}
          fetchCallback={selectCallback}
        />
      </CustomDialog>
      <CustomDialog
        dialogHandler={createDialog}
        title="link employee"
        mode="save"
        size="4xl"
        className="dark:bg-gray-800 bg-white w-full text-black dark:text-white  transform rounded-2xl  p-6 text-left align-middle shadow-xl transition-all"
        onClose={onResetDialog}
        onSubmit={onCreate}
        onCancel={onResetDialog}
      >
        <EmployeeLinkForm
          dialog={createDialog}
          selectedUser={createDialog.data}
          control={control}
          errors={errors}
          fetchCallback={selectCallback}
        />
      </CustomDialog>
      <PinnedItem className=" w-full flex-grow pb-12 flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 h-10 px-4 rounded mt-6 relative"
          onClick={() => {
            handleOpenDialog(createDialog.data, "create");
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
