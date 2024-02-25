"use client";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { signIn, signOut } from "next-auth/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext, useTheme } from "../lib/ThemeProvider";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { theme, changeTheme } = useContext(ThemeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    }
  }, [session]);

  function openDialoge() {
    setOpen(!open);
  }

  function setTheme(theme: string) {
    changeTheme(theme);
  }

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {session ? (
        <nav className="h-[56px] bg-blue-800 border-gray-200 px-2 sm:px-4 py-1.5  dark:bg-gray-800 flex flex-row justify-between items-center relative top-0 dark:border-b-2 dark:border-gray-600">
          <div className="">
            <a className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Open Resources
              </span>
            </a>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            {theme == "light" ? (
              <MoonIcon
                className="h-7 w-7 hover:text-gray-500 duration-300 text-white cursor-pointer rounded-full border-2 border-gray-400 transform hover:scale-125 hover:-rotate-12"
                onClick={() => setTheme("dark")}
              />
            ) : (
              <SunIcon
                className="h-7 w-7 hover:text-gray-500 duration-300 text-yellow-400 cursor-pointer rounded-full border-2 border-yellow-400 transform hover:scale-125 hover:rotate-180 animate-[spin_3s_linear_infinite]"
                onClick={() => setTheme("light")}
              />
            )}
            <div
              className="rounded-full bg-gray-200 h-full w-10 overflow-hidden cursor-pointer"
              onClick={() => openDialoge()}
              ref={menuRef}
            >
              <img
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt=""
                className="transition duration-300 hover:blur-[1.5px]"
              />
              {open && (
                <div className="absolute transform bg-white -translate-x-3/4 translate-y-1/4 border border-gray-700 rounded dark:bg-gray-800 p-2 shadow-md w-40 text-black dark:text-white z-50">
                  <div className="transform duration-300 hover:bg-gray-700 rounded p-1">
                    Profile
                  </div>
                  <div
                    className="transform duration-300 hover:bg-gray-700 rounded p-1"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    role="button"
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <header className="bg-blue-800 text-white p-4 flex justify-between items-center rounded-sm">
          <h1 className="text-3xl font-bold">Open Resources</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-lg hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:underline">
                  About
                </a>
              </li>
              <li>
                {/* Conditional rendering for login/logout */}
                {loggedIn ? (
                  <a href="#" className="text-lg hover:underline">
                    Logout
                  </a>
                ) : (
                  <a
                    className="text-lg hover:underline"
                    onClick={() => signIn()}
                  >
                    Login
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}
