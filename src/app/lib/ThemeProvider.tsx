"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light" || "dark",
  changeTheme: (theme: string) => {},
});

// Not using theme provider, use head script instead. Provider flickers on load
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, changeTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} key={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (global?.window !== undefined) {
      return global.window.localStorage.getItem("theme") || "light";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    if (global?.window !== undefined) {
      console.log("theme", global.window.localStorage.getItem("theme"));

      document.documentElement.className = theme;
    }
  }, [theme]);

  function changeTheme(theme: string) {
    console.log(theme);

    global.window.localStorage.setItem("theme", theme);
    setTheme(theme);
    console.log(localStorage.getItem("theme"));
  }
  return { theme, changeTheme };
}
