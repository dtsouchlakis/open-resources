"use client";
import { DragEvent, useEffect, useState } from "react";
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
import PinnedItem from "@/app/components/PinnedItem";
import {
  CalendarDaysIcon,
  XCircleIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type Event = {
  title?: string;
  start: Date;
  end: Date;
  startWholeDay: boolean;
  endWholeDay: boolean;
  id?: string;
};
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const dialog = useDialog();
  const [edit, setEdit] = useState<boolean>(false);
  const [view, setView] = useState<View>("month");
  const [indexToEdit, setIndexEdit] = useState<number | null>(null);
  const { control, register, formState, getValues } = useForm<Event>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
      startWholeDay: false,
      endWholeDay: false,
    },
  });

  const switchValueStart = useWatch({
    control,
    name: "startWholeDay",
  });
  const switchValueEnd = useWatch({
    control,
    name: "endWholeDay",
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
  }, [switchValueStart, switchValueEnd, startDt, endDt]);

  async function init() {
    const _events = await axios.get("/api/holiday");
    console.log(_events.data);
    let events = _events.data.map((e: any) => {
      return {
        start: e.dateFrom,
        end: e.dateTo,
        allDay: e.wholeDay,
        title: e.description,
        id: e.id,
      };
    });
    setEvents(events);
  }

  useEffect(() => {
    console.log(events);

    init();

    console.log(events, getValues());
  }, [edit]);

  async function handleEdit(index?: number) {
    index ? setIndexEdit(index) : setIndexEdit(null);
    console.log(getValues(), "edit");

    dialog.openModal();
    console.log(edit);
  }

  async function handleAdd(start: Date, end: Date) {
    console.log(getValues(), "add");

    startDt.setDate(start.getDate());
    endDt.setDate(end.getDate());

    dialog.openModal();
    setEdit(true);
  }
  async function handleSubmit() {
    console.log(getValues(), "submit");

    setEdit(true);
    if (!edit) {
      try {
        let data = await axios.post("/api/holiday", {
          startDt,
          endDt,
          switchValueEnd,
          switchValueStart,
        });
        dialog.closeModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      const res = await axios.put("/api/holiday", {
        startDt,
        endDt,
        switchValueEnd,
        switchValueStart,
        id: events[0].id,
      });
    }
    init();
  }
  async function handleDelete(index: number) {
    console.log(events[index]);
    setIndexEdit(index);
    try {
      const res = await axios.delete("/api/holiday", {
        data: {
          id: events[index].id,
        },
      });
      init();
      setIndexEdit(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Drawer
      className="flex flex-row flex-shrink-0 w-full justify-around gap-8"
      title="Holidays"
    >
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
        <div className="flex flex-col justify-between w-full text-black text-sm space-y-4 h-full">
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
                  showTimeSelect={!switchValueStart}
                  dateFormat={
                    switchValueStart ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm"
                  }
                  readOnly={!edit}
                  def
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
                  dateFormat={
                    switchValueEnd ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm"
                  }
                  showTimeSelect={!switchValueEnd}
                  readOnly={!edit}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="startWholeDay"
            render={({ field: { value, onChange } }) => (
              <div className="grid grid-cols-8">
                <label className="col-span-4">Start Whole Day</label>
                <SwitchComponent
                  className="relative mr-7"
                  checked={switchValueStart}
                  disabled={!edit}
                  onChange={() =>
                    switchValueStart ? onChange(false) : onChange(true)
                  }
                  name
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="endWholeDay"
            render={({ field: { value, onChange } }) => (
              <div className="grid grid-cols-8">
                <label className="col-span-4">End Whole Day</label>
                <SwitchComponent
                  className="relative mr-7"
                  checked={switchValueEnd}
                  disabled={!edit}
                  onChange={() =>
                    switchValueEnd ? onChange(false) : onChange(true)
                  }
                  name
                />
              </div>
            )}
          />
        </div>
      </CustomDialog>
      <PinnedItem className=" grow">
        <div className="w-full  grid grid-flow-row justify-center items-center">
          {events.map((event, index) => (
            <div
              className="flex flex-shrink-0 items-center justify-between"
              key={index}
            >
              <CalendarDaysIcon className="w-6 mr-2 text-blue-500" />
              <div className="h-10 border-b border-gray-300 flex items-center">
                {new Date(event.start).toDateString()} -
                {new Date(event.end).toDateString()}
              </div>
              <div className="flex items-center ml-2">
                <PencilSquareIcon
                  className="w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => {
                    setEdit(true);
                    handleEdit(index);
                  }}
                />
                <TrashIcon
                  className="w-6 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
                {/* <XCircleIcon className="w-6 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete()}/>
                <CheckCircleIcon className="w-6 text-green-500 hover:text-green-700 cursor-pointer" onClick={() => handleEdit()}/> */}
              </div>
            </div>
          ))}
        </div>
      </PinnedItem>
      <PinnedItem className="w-auto">
        <div className="flex flex-col items-center justify-center text-black h-full rounded-sm">
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
            onDragOver={(event: DragEvent) => handleAdd(startDt, endDt)}
            onSelectEvent={(event) => handleEdit()}
            onSelectSlot={(slotInfo) => handleAdd(slotInfo.start, slotInfo.end)}
          />
        </div>
      </PinnedItem>
    </Drawer>
  );
}
