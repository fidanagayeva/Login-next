"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Modal/index";
import { useData } from "../context/DataContext";
import { setCookie } from "cookies-next";

const Page = () => {
  const router = useRouter();
  const { data, setData } = useData(); 

  const initialData = [
    {
      id: 1,
      image: "data:image/png;base64,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",
      name: "John Doe",
      position: "Software Engineer",
      office: "New York",
      age: 30,
      startDate: "2021-01-15",
      salary: "$120,000",
    },
    {
      id: 2,
      image: "data:image/png;base64,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",
      name: "Jane Smith",
      position: "Product Manager",
      office: "San Francisco",
      age: 28,
      startDate: "2020-11-01",
      salary: "$110,000",
    },
    {
      id: 3,
      image: "data:image/jpeg;base64,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",
      name: "Alice Johnson",
      position: "UI/UX Designer",
      office: "Los Angeles",
      age: 26,
      startDate: "2022-03-10",
      salary: "$90,000",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYkpAMeQ7efqBOQKrfmaR28jcKnHZgK5cQ9w&s",
      name: "Alice Johnson",
      position: "UI/UX Designer",
      office: "Los Angeles",
      age: 26,
      startDate: "2022-03-10",
      salary: "$90,000",
    },
    {
      id: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWUqU58jhSb6ayaw6uERDdC2aPAxzoAtWwA&s",
      name: "Alice Johnson",
      position: "UI/UX Designer",
      office: "Los Angeles",
      age: 26,
      startDate: "2022-03-10",
      salary: "$90,000",
    },
    {
      id: 6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpaPJD7pvji8R3t6_VCfaSmkz6wKxL3nVOg&s",
      name: "Alice Johnson",
      position: "UI/UX Designer",
      office: "Los Angeles",
      age: 26,
      startDate: "2022-03-10",
      salary: "$90,000",
    },
  ];

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


  if (data.length === 0) {
    setData(initialData);
  }

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
    <div className="flex">
      <div className="w-1/6 h-screen bg-black p-4 text-white">
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
        <div className="bg-gradient-to-r from-black via-white to-black flex justify-end items-center text-white p-3 rounded-md mb-4">
          <button
            onClick={handleLogout}
            className="mx-5 bg-white text-black px-4 py-2 rounded-md"
          >
            LogOut
          </button>
          <button
            onClick={handleCreate}
            className="mx-5 bg-white text-black px-4 py-2 rounded-md"
          >
            Create
          </button>
        </div>

        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-300">Image</th>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Position</th>
                  <th className="p-2 border border-gray-300">Office</th>
                  <th className="p-2 border border-gray-300">Age</th>
                  <th className="p-2 border border-gray-300">Start date</th>
                  <th className="p-2 border border-gray-300">Salary</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 border border-gray-300">
                      <img src={item.image} alt={item.name} className="h-10 w-10 object-cover" />
                    </td>
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="p-2 border border-gray-300">{item.position}</td>
                    <td className="p-2 border border-gray-300">{item.office}</td>
                    <td className="p-2 border border-gray-300">{item.age}</td>
                    <td className="p-2 border border-gray-300">{item.startDate}</td>
                    <td className="p-2 border border-gray-300">{item.salary}</td>
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
