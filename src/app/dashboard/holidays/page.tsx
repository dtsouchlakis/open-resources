"use client";
import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomDialog, { useDialog } from "../../components/CustomDialog";
import { Disclosure } from "@headlessui/react";
import { SwitchComponent } from "../../components/Switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import DateTimePicker from "@/app/components/DateTimePicker";
import axios from "axios";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

type Event = {
  start: Date;
  end: Date;
  allDay: boolean;
};
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const dialog = useDialog();
  const [edit, setEdit] = useState<boolean>(false);
  const [view, setView] = useState<View>("month");
  const { control, register, formState, getValues } = useForm<Event>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
  });

  const switchValue = useWatch({
    control,
    name: "allDay",
  });

  const startDt = useWatch({
    control,
    name: "start",
  });

  const endDt = useWatch({
    control,
    name: "end",
  });

  useEffect(() => {
    console.log(getValues());
  }, [switchValue, startDt, endDt]);

  useEffect(() => {
    async function init() {
      const _events = await axios.get("/api/holiday");
      console.log(_events.data);
      let events = _events.data.map((e: any) => {
        return {
          start: e.dateFrom,
          end: e.dateTo,
          allDay: e.wholeDay,
        };
      });
      setEvents(events);
    }

    init();
    console.log(events);
  }, []);

  async function handleEdit() {
    dialog.openModal();
    console.log(edit);
  }

  async function handleAdd() {
    dialog.openModal();
    setEdit(true);
  }
  async function handleSubmit() {
    setEdit(true);
    try {
      let data = await axios.post("/api/holiday", getValues());
      dialog.closeModal();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Drawer>
      <CustomDialog
        dialogHandler={dialog}
        title={edit ? "Add Event" : "Submited Event"}
        mode={edit ? "save" : "okay"}
        onClose={() => {
          dialog.closeModal();
          setEdit(false);
        }}
        onSubmit={() => {
          handleSubmit();
        }}
        onCancel={() => {
          dialog.closeModal();
        }}
      >
        <div className="flex flex-col justify-between w-full text-black text-sm space-y-4">
          <Controller
            control={control}
            name="start"
            render={({ field: { value, onChange } }) => (
              <div className=" flex items-baseline justify-between">
                <label>Start</label>
                <DateTimePicker
                  selected={startDt}
                  onChange={onChange}
                  preventOpenOnFocus
                  readOnly={!edit}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field: { value, onChange } }) => (
              <div className=" flex items-baseline justify-between">
                <label>End</label>
                <DateTimePicker
                  selected={endDt}
                  onChange={onChange}
                  readOnly={!edit}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="allDay"
            render={({ field: { value, onChange } }) => (
              <div className="grid grid-cols-8">
                <label className="col-span-4">Whole Day</label>
                <SwitchComponent
                  className="relative mr-7"
                  checked={switchValue}
                  disabled={!edit}
                  onChange={() =>
                    switchValue ? onChange(false) : onChange(true)
                  }
                  name
                />
              </div>
            )}
          />
        </div>
      </CustomDialog>

      <div className="w-full h-full flex flex-col justify-center items-center">
        {events.map((event, index) => (
          <p key={index}>
            {event.start.getDate()} - {event.allDay} -
          </p>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center text-black h-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <h1 className="text-3xl font-bold underline">
                  Holiday Calendar
                </h1>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                <DnDCalendar
                  localizer={localizer}
                  events={events}
                  style={{ height: 500 }}
                  defaultDate={new Date()}
                  views={["month", "work_week"]}
                  view={view}
                  onView={setView}
                  draggableAccessor={(event) => true}
                  onDoubleClickEvent={(e) => handleEdit()}
                  selectable
                  onDragOver={(event) => handleAdd()}
                  onSelectEvent={(event) => handleEdit()}
                  onSelectSlot={(slotInfo) => handleAdd()}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </Drawer>
  );
}
