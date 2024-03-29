import Link from "next/link";
import { menuItems } from "../components/menuItems";

export default function Menu({ open }: { open: boolean }) {
  return (
    <div className="w-full h-full grid divide-y-2 space-y-4  items-center dark:bg-gray-800">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-black hover:text-gray-500 duration-300 pt-1 flex flex-row gap-2 dark:text-white"
        >
          <div className="w-6">{item.icon}</div>
          {open && item.name}
        </Link>
      ))}
    </div>
  );
}
