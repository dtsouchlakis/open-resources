import { SwitchComponent } from "./Switch";
import { Controller } from "react-hook-form";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GroupBase } from "react-select";
import { TypedSelect } from "./SelectTyped";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { useTheme } from "../lib/ThemeProvider";

type withRange = boolean | undefined;
interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  options: Option[];
  callback: (name: string, value: any) => void;
  control: any;
  label?: string;
  name: string;
  defaultValue?: any;
  className?: string;
  placeholder?: string;
  isMulti?: IsMulti;
  groupBy?: (option: Option) => Group;
  hideSelectedOptions?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  menuIsOpen?: boolean;
  noOptionsMessage?: (inputValue: string) => string;
  onInputChange?: (inputValue: string, actionMeta: any) => void;
  onChange?: (newValue: any, actionMeta: any) => void;
  onMenuClose?: () => void;
  onMenuOpen?: () => void;
  openMenuOnClick?: boolean;
  value?: any;
  isClearable?: boolean;
}

interface FormInputProps
  extends React.InputHTMLAttributes<
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | ReactDatePickerProps<withRange>
    | SelectProps
  > {
  inputType:
    | "input"
    | "textarea"
    | "date"
    | "switch"
    | "select"
    | "typedSelect";
  options?: string[];
  labelClass?: string;
  label?: string;
  required?: boolean;
  control?: any;
  callback?: (name: string, value: any) => Promise<AxiosResponse>;
}

export default function FormInput({ inputType, ...props }: FormInputProps) {
  const returnEl = (props: any) => {
    console.log(props, inputType);

    switch (inputType) {
      case "input":
        return <input {...props} />;
      case "textarea":
        return <textarea {...props} />;
      case "date":
        return <DatePicker {...props} selected={props.value} />;
      case "switch":
        return <SwitchComponent {...props} />;
      case "typedSelect":
        return <TypedSelect {...props} callback={props.callback} />;
      case "select":
        return (
          <select {...props}>
            {props.options?.map((o: any) => (
              <option>{o}</option>
            ))}
          </select>
        );
    }
  };
  return (
    <>
      {props.label && (
        <label className={props.labelClass}>
          {props.label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {props.control ? (
        <Controller
          control={props.control}
          rules={{ required: props.required }}
          name={props.name ? props.name : props.label || ""}
          render={({ field: { onChange, value, ref, ...field } }) => (
            <>{returnEl({ ...props, onChange, value, ref, ...field })}</>
          )}
        />
      ) : (
        returnEl({ ...props })
      )}
    </>
  );
}
