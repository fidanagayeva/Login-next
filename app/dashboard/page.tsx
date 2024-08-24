"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useRequest } from "../_http/axiosFetcher";
import CustomButtonLoading from "../_components/CustomLoadingButton";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error } = useRequest("user", {
    module: "devApi",
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCookie("token", "", {
      expires: new Date(Date.now()),
    });

    router.push("/");
  };

  const navigateToCardPage = () => {
    router.push("/dashboard/card"); 
  };

  return (
    <div className="flex">
      <div className="w-1/6 h-screen bg-black p-4 text-white">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="font-semibold cursor-pointer" onClick={navigateToCardPage}>
            Card
          </li>
          <li>Tables</li>
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
          {isLoading ? (
            <CustomButtonLoading />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-300">Name</th>
                    <th className="p-2 border border-gray-300">Position</th>
                    <th className="p-2 border border-gray-300">Office</th>
                    <th className="p-2 border border-gray-300">Age</th>
                    <th className="p-2 border border-gray-300">Start date</th>
                    <th className="p-2 border border-gray-300">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id}>
                        <td className="p-2 border border-gray-300">{item.name}</td>
                        <td className="p-2 border border-gray-300">{item.position}</td>
                        <td className="p-2 border border-gray-300">{item.office}</td>
                        <td className="p-2 border border-gray-300">{item.age}</td>
                        <td className="p-2 border border-gray-300">{item.startDate}</td>
                        <td className="p-2 border border-gray-300">{item.salary}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {error && (
            <button className="my-5 bg-red-100 text-red-500 px-4 py-2 rounded-md">
              {error.message}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
