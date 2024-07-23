import React from "react";
import { useFormik } from "formik";
import { API } from "./global";
import { useNavigate } from "react-router-dom";

export function Reset() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      newPassword: "",
      token: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 200) {
        navigate("/");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <form className="flex flex-col items-center mt-5" onSubmit={formik.handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <input
          placeholder="New Password"
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"
        />
        <input
          placeholder="Code"
          name="token"
          value={formik.values.token}
          onChange={formik.handleChange}
          className="w-80 p-3 m-2 border-none"

        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white p-2 w-60 border-none mt-2 cursor-pointer text-center">Submit</button>
      </form>
      <label className="text-center mt-5">
          I Know Password...!!! <a href="/" className="text-blue-500 mt-3 hover:text-blue-800">Sign In</a>
        </label>
    </div>
  );
}
