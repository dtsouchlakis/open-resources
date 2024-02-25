"use client";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { ScaleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

var currLang: String = "English";
var nonSelectedLang: String = "Korean";

export default function Footer() {
  const [open, setOpen] = useState(false);

  function openDialoge() {
    setOpen(!open);
  }

  return (
    <footer className="z-50 w-full h-[40px] relative bottom-0 bg-blue-800 border-gray-200 px-2 sm:px-4 py-1.5 rounded dark:bg-gray-800 flex flex-row justify-between items-center">
      <p className="font-medium">Copyright © 2024</p>
      <div>
        <ul className="flex justify-center items-center flex-row space-x-5">
          <li>
            <button
              onClick={() => openDialoge()}
              className="me-3 text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-700"
              type="button"
            >
              <img src="/usa.png" className="h-5 me-3" />
              {currLang}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
            {open && (
              <div className="absolute transform -translate-x-2 -translate-y-24 bg-white rounded-lg shadow-md w-40 p-2 dark:bg-gray-800">
                <ul className="text-sm">
                  <li className="cursor-pointer flex items-center transform duration-300 hover:bg-gray-700 rounded p-1">
                    <img src="/korea.png" className="h-5 me-3" />
                    <a onClick={() => openDialoge()}>{nonSelectedLang}</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              className="inline-flex justify-center p-2 rounded-lg cursor-pointer dark:hover:bg-gray-700"
            >
              <img src="/github.svg" className="h-5 fill-blue" />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              className="inline-flex justify-center p-2 rounded-lg cursor-pointer dark:hover:bg-gray-700"
            >
              <EnvelopeIcon className="h-5 fill-white" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              className="inline-flex justify-center p-2 rounded-lg cursor-pointer dark:hover:bg-gray-700"
            >
              <ScaleIcon className="h-5 fill-white" />
            </a>
          </li>
          <li className="p-0 m-0">
            <span className="font-medium text-xs span-0 m-0">powered by </span>
            <a
              href="https://nextjs.org/"
              target="_blank"
              className="inline-flex justify-center rounded-lg cursor-pointer dark:hover:bg-gray-700"
            >
              <img src="/next.svg" className="h-2 " />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
