import React from "react";
import { useFormik } from "formik";
import { API } from "./global";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (data.status === 401) {
        console.log("error");
      } else {
        console.log("success");
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/");
      }
    },
  });

  return (
    <div className="h-screen flex flex-col items-center w-full justify-center">
      <h1 className=" text-3xl font-bold mb-4">Signup</h1>
      <form
        className="flex flex-col items-center mt-5 justify-center"
        onSubmit={formik.handleSubmit}
      >
        <input
          placeholder="Email"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white p-2 w-60 border-none mt-2 cursor-pointer text-center"
        >
          Sign Up
        </button>
        <label className="text-center mt-5">
          Already have an Account? <a href="/" className="text-blue-500 hover:text-blue-800">Sign In</a>
        </label>
      </form>
    </div>
  );
}
