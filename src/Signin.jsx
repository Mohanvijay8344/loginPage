import React from "react";
import { useFormik } from "formik";
import { API } from "./global";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("error");
        alert("Invalid Cretentials ❌❌");
      } else {
        console.log("success");
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/home");
        alert("Login Successfull ✅✅");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-3xl font-bold mb-4">Login</h1>
      <form
        className="flex flex-col items-center mt-5"
        onSubmit={formik.handleSubmit}
      >
        <input
          placeholder="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <input
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white p-2 w-60 border-none mt-2 cursor-pointer text-center"
        >
          Sign In
        </button>
        <label className="text-center mt-5">
          Not a member?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-800">
            Sign Up
          </a>
        </label>
        <a
          href="/forgot-password"
          className="text-blue-500 mt-3 hover:text-blue-800"
        >
          Forgot Password
        </a>
      </form>
    </div>
  );
}
