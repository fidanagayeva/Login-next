"use client";
import Image from "next/image";
import { useRequestMutation } from "./_http/axiosFetcher";
import CustomButtonLoading from "./_components/CustomLoadingButton";
import { useFormik } from "formik";
import { LoginValidationSchema } from "./_validator/LoginValidation";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    trigger: loginservice,
    isMutating: loaading,
    error: isErr,
  } = useRequestMutation("login", {
    method: "POST",
    module: "devApi",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const InitialForm = {
    username: "",
    password: "",
    expiresInMins: 30,
  };
  const formik = useFormik({
    initialValues: InitialForm,
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      loginservice({
        body: values,
      }).then((res) => {
        setCookie("token", res.token, {
          expires: new Date(Date.now() + values.expiresInMins * 60000),
        });

        if (res.token && res) {
          router.push("/dashboard");
        }
      });
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isErr && (
        <button className="bg-red-200 text-red-500 px-4 py-2 rounded-md">
          {isErr.message}
        </button>
      )}
      <form
        id="login"
        onSubmit={formik.handleSubmit}
        className="max-w-[700px] w-full my-5 rounded-md p-5 shadow-md"
      >
        <input
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          placeholder="Username"
          className="w-full px-4 py-3 my-2 outline-none shadow-md rounded-md border border-gray-300"
        />{" "}
        {formik.errors.username && formik.touched.username ? (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        ) : null}
        <input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 my-3 outline-none shadow-md rounded-md border border-gray-300"
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        ) : null}
        <button
          type="submit"
          id="login"
          className="w-full flex items-center justify-center gap-2 p-3 my-2 bg-blue-500 text-white rounded-sm shadow-md"
        >
          {loaading ? <CustomButtonLoading /> : "Login"}
        </button>
      </form>
    </main>
  );
}
