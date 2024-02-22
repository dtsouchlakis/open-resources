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

export default function Drawer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-gray-100 h-full flex flex-row overflow-hidden ">
      <div
        className={`bg-white shadow-lg relative top-0 text-black ${
          open ? "w-64" : "w-12"
        } h-screen left-0 duration-300`}
      >
        <button
          className="absolute top-0 right-0 text-black p-3"
          onClick={() => setOpen(!open)}
        >
          <ArrowRightCircleIcon
            className={`h-6 w-6  hover:text-gray-500 duration-300 ${
              open
                ? "transform rotate-0 hover:rotate-180"
                : "transform rotate-180 hover:rotate-0"
            }`}
          />
        </button>
        {open && <h2 className="text-2xl font-bold p-3">Menu</h2>}
        <div className="p-3 w-full flex flex-col justify-between top-16 relative border-t-2 border-b-2">
          <Menu open={open} />
        </div>
      </div>
      <div className="p-3 w-full h-full overflow-auto">{children}</div>
    </div>
  );
}
