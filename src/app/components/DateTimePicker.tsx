import React, { Ref, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefCallBack } from "react-hook-form";

export default function DateTimePicker(props: any) {
  return (
    <div className="flex justify-between items-center w-full max-w-xs mx-auto">
      <DatePicker
        {...props}
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
