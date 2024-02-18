"use client";
import { useEffect } from "react";
import Drawer from "../components/Drawer";

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
