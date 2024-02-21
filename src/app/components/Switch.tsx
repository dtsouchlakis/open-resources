import {
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  Ref,
  useEffect,
} from "react";
import { Switch } from "@headlessui/react";
import { UseFormProps, UseFormReturn } from "react-hook-form";
export function SwitchComponent(props: any) {
  return (
    <div className={`flex  ${props.className}`}>
      <Switch
        {...props}
        className={`${props.checked ? "bg-teal-700" : "bg-gray-200"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 `}
      >
        <span
          aria-hidden="true"
          className={`${props.checked ? "translate-x-4" : "-translate-x-1"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full -translate-y-0.5 bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
