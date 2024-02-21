"use client";
import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomDialog, { useDialog } from "../../components/CustomDialog";
import { Datepicker } from "flowbite-react";
import { SwitchComponent } from "../../components/Switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import DateTimePicker from "@/app/components/DateTimePicker";
import axios from "axios";

type Event = {
  start: Date;
  end: Date;
  wholeDay: boolean;
};
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const dialog = useDialog();
  const [view, setView] = useState<View>("month");
  const { control, register, handleSubmit, formState, getValues } =
    useForm<Event>({
      defaultValues: {
        start: new Date(),
        end: new Date(),
        wholeDay: false,
      },
    });

  const switchValue = useWatch({
    control,
    name: "wholeDay",
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

  useEffect(() => {
    console.log(events);
  }, [events]);
  async function handleAdd() {
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
        title="Add"
        mode="save"
        onSubmit={handleAdd}
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
                <DateTimePicker selected={startDt} onChange={onChange} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field: { value, onChange } }) => (
              <div className=" flex items-baseline justify-between">
                <label>End</label>
                <DateTimePicker selected={endDt} onChange={onChange} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="wholeDay"
            render={({ field: { value, onChange } }) => (
              <div className="grid grid-cols-8">
                <label className="col-span-4">Whole Day</label>
                <SwitchComponent
                  className="relative mr-7"
                  checked={switchValue}
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
      <div className="flex flex-col items-center justify-center text-black h-full">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <DnDCalendar
          localizer={localizer}
          events={events}
          style={{ height: 500 }}
          defaultDate={new Date()}
          views={["month", "work_week"]}
          view={view}
          onView={setView}
          draggableAccessor={(event) => true}
          onDoubleClickEvent={(e) => dialog.openModal()}
          selectable
          onDragOver={(event) => dialog.openModal()}
          onSelectEvent={(event) => dialog.openModal()}
          onSelectSlot={(slotInfo) => dialog.openModal()}
        />
      </div>
    </Drawer>
  );
}
