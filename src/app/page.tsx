"use client";
import { useEffect } from "react";
import Drawer from "./components/Drawer";
import Menu from "./components/Menu";
import { menuItems } from "./components/menuItems";
import { getServerSession } from "next-auth";

export default function Home() {
  useEffect(() => {
    console.log(process.env);
  }, []);
  return (
    <Drawer>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Drawer>
  );
}
