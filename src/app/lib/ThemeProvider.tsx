"use client";
import { root } from "postcss";
import React, { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, changeTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} key={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (global?.window !== undefined) {
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
