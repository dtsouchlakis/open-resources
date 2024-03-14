import React, { Ref, useEffect, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefCallBack } from "react-hook-form";

export default function DateTimePicker(props: any) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <DatePicker
      {...props}
      timeIntervals={15}
      className={
        props.className ||
        "py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    />
  );
}
