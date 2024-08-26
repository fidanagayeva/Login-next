"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Modal/index";
import { setCookie } from "cookies-next";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState({
    image: "",
    name: "",
    position: "",
    office: "",
    age: "",
    startDate: "",
    salary: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCookie("token", "", {
      expires: new Date(Date.now()),
    });

    router.push("/");
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  const handleCreate = () => {
    setCurrentData({
      image: "",
      name: "",
      position: "",
      office: "",
      age: "",
      startDate: "",
      salary: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const { image, name, position, office, age, startDate, salary } = currentData;

    if (!image || !name || !position || !office || !age || !startDate || !salary) {
      toast.error("All fields are required!");
      return;
    }

    if (currentData.id) {
      setData(
        data.map((item) =>
          item.id === currentData.id ? { ...item, ...currentData } : item
        )
      );
    } else {
      setData([...data, { ...currentData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setCurrentData(item);
    setShowModal(true);
  };

  const handleView = (item) => {
    setCurrentData(item);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/6 h-screen bg-black p-4 text-white">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="font-semibold cursor-pointer" onClick={() => router.push("/dashboard/card")}>
            Card
          </li>
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
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-gradient-to-r from-black via-white to-black flex flex-col md:flex-row justify-end items-center text-white p-3 rounded-md mb-4">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto mx-5 bg-white text-black px-4 py-2 rounded-md"
          >
            LogOut
          </button>
          <button
            onClick={handleCreate}
            className="w-full md:w-auto mx-5 bg-white text-black px-4 py-2 rounded-md mt-4 md:mt-0"
          >
            Create
          </button>
        </div>

        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Image</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Name</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Position</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Office</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Age</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Start date</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Salary</th>
                  <th className="p-2 border border-gray-300 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">
                      <img src={item.image} alt={item.name} className="h-10 w-10 object-cover" />
                    </td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.name}</td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.position}</td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.office}</td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.age}</td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.startDate}</td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">{item.salary}</td>
                    <td className="p-2 border-l border-r border-t flex space-x-2">
                      <button
                        className="text-black px-5 py-0 rounded-md focus:outline-none focus:ring-0"
                        onClick={() => handleView(item)}
                      >
                        <AiFillEye className="text-xl" />
                      </button>
                      <button
                        className="text-black px-2 py-1 rounded-md focus:outline-none focus:ring-0"
                        onClick={() => handleEdit(item)}
                      >
                        <AiFillEdit className="text-xl" />
                      </button>
                      <button
                        className="text-black px-2 py-1 rounded-md focus:outline-none focus:ring-0"
                        onClick={() => handleDelete(item.id)}
                      >
                        <AiFillDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        currentData={currentData}
        setCurrentData={setCurrentData}
        handleSave={handleSave}
      />

      <ToastContainer />
    </div>
  );
};

export default Page;