"use client";
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useRequest } from "../_http/axiosFetcher";
import CustomButtonLoading from "../_components/CustomLoadingButton";
const page = () => {
  const router = useRouter();
  const { data, isLoading, error } = useRequest("user", {
    module: "devApi",
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  const [blur, setBlur] = React.useState(true);
  const handleLogut = () => {
    localStorage.removeItem("user");
    setCookie("token", "", {
      expires: new Date(Date.now()),
    });

    router.push("/");
  };
  return (
    <div>
      {isLoading && <CustomButtonLoading />}
      <div className="bg-black flex justify-end items-center text-white p-3 rounded-md">
        <Image
          alt="user-image"
          onLoad={() => setBlur(false)}
          className={clsx("rounded-full", blur ? "filter blur-md" : "")}
          src={data?.image}
          width={50}
          height={50}
        />
        <button className="bg-blue-400 rounded-xl w-12 h-12 text-white">
          {data && data?.firstName.charAt(0)}
          {data && data?.lastName.charAt(0)}
        </button>
        <button
          onClick={handleLogut}
          className="mx-5 bg-red-200 text-red-500 px-4 py-2 rounded-md"
        >
          LogOut
        </button>
      </div>
      {error && (
        <button className="my-5 bg-red-100 text-red-500 px-4 py-2 rounded-md">
          {error.message}
        </button>
      )}
      <Image
        onLoad={() =>
          setTimeout(() => {
            setBlur(false);
          }, 5000)
        }
        className={clsx("rounded-full", blur ? "filter blur-md" : "")}
        src={data?.image}
        width={350}
        height={350}
      />
      <h1>
        {data && data?.role}///
        {data && data?.university}
      </h1>
    </div>
  );
};

export default page;
