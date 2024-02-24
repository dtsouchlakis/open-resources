import React, { Ref, useEffect, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefCallBack } from "react-hook-form";

export default function DateTimePicker(props: any) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className="flex justify-between items-center w-full max-w-xs mx-auto">
      <DatePicker
        {...props}
        timeIntervals={15}
        className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
