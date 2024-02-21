"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Welcome to HR Platform</h1>
        <p className="text-gray-600 mb-8">
          Your go-to platform for managing HR operations.
        </p>
        <div className="flex justify-between">
          <Link href="/api/auth/signin?callbackUrl=%2Fdashboard">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Sign In
            </button>
          </Link>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
