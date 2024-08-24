"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const CardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCookie("token", "", {
      expires: new Date(Date.now()),
    });

    router.push("/");
  };

  const navigateToDashboard = () => {
    router.push("/dashboard"); // Navigate back to the dashboard page
  };

  return (
    <div className="flex">
      <div className="w-1/6 h-screen bg-black p-4 text-white">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer" onClick={navigateToDashboard}>
            Tables
          </li>
          <li>Virtual Reality</li>
          <li>RTL</li>
          <li className="font-bold mt-6">Account Pages</li>
          <li>Profile</li>
          <li>Sign In</li>
          <li>Sign Up</li>
        </ul>
        <div className="mt-auto">
          <p className="text-gray-400">Need help?</p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
            Documentation
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-gradient-to-r from-black via-white to-black flex justify-end items-center text-white p-3 rounded-md mb-4">
          <button
            onClick={handleLogout}
            className="mx-5 bg-white text-black px-4 py-2 rounded-md"
          >
            LogOut
          </button>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Cards</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Card 1</h2>
              <p>This is card 1 description.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Card 2</h2>
              <p>This is card 2 description.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Card 3</h2>
              <p>This is card 3 description.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
