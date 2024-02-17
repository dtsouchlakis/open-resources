"use client";
import { sign } from "crypto";
import { signOut } from "next-auth/react";

export default function NavBar() {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-1.5 rounded dark:bg-gray-800 flex flex-row justify-between items-center ">
        <div className="container mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
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
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
          <div className="rounded-full bg-gray-200 h-full w-10 overflow-hidden">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <button
              onClick={() => signOut()}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
