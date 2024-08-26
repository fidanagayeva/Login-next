"use client";
import { useRequestMutation } from "./_http/axiosFetcher";
import CustomButtonLoading from "./_components/CustomLoadingButton";
import { useFormik } from "formik";
import { LoginValidationSchema } from "./_validator/LoginValidation";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FiUser, FiLock } from "react-icons/fi";

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
    <main className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-white via-gray-200 to-gray-900">
      <div className="w-full md:w-1/2 min-h-screen"></div>
      <div className="w-full md:w-1/2 min-h-screen"></div>

      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col md:flex-row shadow-lg">
        <div className="w-full md:w-1/2 bg-black p-8 flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome</h1>
          <p className="text-2xl mb-2">to the site 🎉</p>
        </div>
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login Here!</h2>
          <form id="login" onSubmit={formik.handleSubmit}>
            <div className="relative mb-4">
              <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="username"
                placeholder="username"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400"
              />
              {formik.errors.username && formik.touched.username ? (
                <p className="text-red-500 text-sm mt-2">{formik.errors.username}</p>
              ) : null}
            </div>
            <div className="relative mb-6">
              <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                placeholder="password"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400"
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-500 text-sm mt-2">{formik.errors.password}</p>
              ) : null}
            </div>
            <button
              type="submit"
              id="login"
              className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 text-white rounded-full shadow-md"
            >
              {loaading ? <CustomButtonLoading /> : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </main>

  );
}