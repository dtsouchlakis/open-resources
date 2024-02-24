"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  BookOpenIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Menu from "./Menu";
import "react-calendar/dist/Calendar.css";
import Footer from "./Footer";

export default function Drawer({
  title,
  className,
  children,
}: Readonly<{
  title?: string;
  className?: string;
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-gray-100 h-[calc(100vh-68px)] flex flex-row dark:bg-gray-600 -mt-14 top-14 relative overflow-hidden dark:text-white text-black">
      <div
        className={`bg-white shadow-lg relative text-black dark:bg-gray-800 ${
          open ? "w-64" : "w-12"
        } h-full left-0 duration-300`}
      >
        <button
          className="absolute top-0 right-0 text-black p-3"
          onClick={() => setOpen(!open)}
        >
          <ArrowRightCircleIcon
            className={`h-6 w-6  hover:text-gray-500 duration-300 dark:text-white ${
              open
                ? "transform rotate-0 hover:rotate-180"
                : "transform rotate-180 hover:rotate-0"
            }`}
          />
        </button>
        {open && (
          <h2 className="text-2xl font-bold p-3 dark:text-white">Menu</h2>
        )}
        <div className="p-3 w-full flex flex-col justify-between top-16 relative border-t-2 border-b-2">
          <Menu open={open} />
        </div>
      </div>
      <div className="w-full h-full bg-gray-100 dark:bg-gray-600">
        <h1 className="text-2xl font-bold p-3 dark:text-white h-16 bg-white dark:bg-gray-800 w-full">
          {title}
        </h1>
        <div className={`p-3 w-full overflow-auto grid h-full ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
