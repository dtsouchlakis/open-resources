"use client";
import { sign } from "crypto";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function NavBar() {

  const [open, setOpen] = useState(false);
  function openDialoge() {
    setOpen(!open);
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-1.5 rounded dark:bg-gray-800 flex flex-row justify-between items-center ">
        <div className="">
          <a className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="rounded-full bg-gray-200 h-full w-10 overflow-hidden cursor-pointer" 
          onClick={
            () => openDialoge()}>
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
              className="transition duration-300 hover:blur-[1.5px]"
            />
            { open && <div className="absolute transform -translate-x-3/4 translate-y-1/4 border border-gray-700 rounded dark:bg-gray-800 p-2 shadow-md w-40">
              <div className="transform duration-300 hover:bg-gray-700 rounded p-1">Profile</div>
              <div className="transform duration-300 hover:bg-gray-700 rounded p-1" onClick={ () => signOut() }>Log out</div>
            </div> }
            {/* <button
              onClick={() => signOut()}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              logout
            </button> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
