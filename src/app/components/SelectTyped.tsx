import { useMemo } from "react";
import AsyncSelect from "react-select/async";
import { useTheme } from "../lib/ThemeProvider";

export function TypedSelect(props: any) {
  const { theme } = useTheme();
  const themeStyles = useMemo(() => {}, [theme]);
  const loadOptions = (inputValue: string) => {
    return props
      .callback(inputValue, props.name)
      .then((res: { data: any[] }) => {
        console.log(res.data);
        return res.data.map((t: { id: any; name: any }) => {
          console.log(t, props.styles, "t");

          return { value: t.id, label: t.name };
        });
      });
  };

  return (
    <AsyncSelect
      styles={
        theme == "dark"
          ? {
              control: (base: any) => ({
                ...base,
                backgroundColor: "rgb(55, 65, 81)",
              }),
              menu: (base: any) => ({
                ...base,
                backgroundColor: "rgb(55, 65, 81)",
              }),
            }
          : {
              control: (base: any) => ({
                ...base,
                backgroundColor: " rgba(0, 0, 0, 0.1)",
              }),
              menu: (base: any) => ({
                ...base,
                backgroundColor: " rgba(0, 0, 0, 0.1)",
              }),
            }
      }
      cacheOptions
      {...props}
      defaultOptions
      loadOptions={loadOptions}
      isClearable={true}
    />
  );
}
