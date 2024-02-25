"use client";
import React from "react";

function Index() {
  return (
    <div className="h-[calc(100%-100px)] relative bg-gray-100 overflow-auto">
      <main className="container mx-auto py-12">
        <section className="hero flex items-center h-screen relative">
          <img
            src="path/to/your/image.jpg"
            alt="Hero Image"
            className="w-full h-full object-cover absolute top-0 left-0"
          />
          <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full"></div>
          <div className="text-center z-10 text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your App!</h1>
            <p className="text-xl mb-8">
              This is the main content of your frontpage.
            </p>
            <a
              href="#"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </section>

        <section className="features mt-16 grid md:grid-cols-3 gap-4">
          <div className="card bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-bold mb-2">Feature 1</h3>
            <p>Description of Feature 1</p>
          </div>
          <div className="card bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-bold mb-2">Feature 2</h3>
            <p>Description of Feature 2</p>
          </div>
          {/* Add more cards for additional features */}
        </section>

        <section className="cta mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <a
            href="./api/auth/signup"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create an Account
          </a>
        </section>
      </main>
    </div>
  );
}

export default Index;
