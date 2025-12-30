import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "../context/AuthProvider.js";
import { Link } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { uthUser, setAuthUser } = useAuth();

  const onSubmit = (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword

    }
    console.log(userInfo)
    axios.post("/api/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast("Signup successful! You Can now log in")
        }
        localStorage.setItem("message", JSON.stringify(res.data))

      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error)
        }
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black px-6 py-4 rounded-md space-y-2 w-full max-w-sm"
      >
        <h1 className="text-2xl text-blue-600 font-semibold text-center">
          Messenger
        </h1>

        <h2 className="text-xl text-center">
          Create a new{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Username */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <input
            {...register("username", { required: true, minLength: 3 })}
            className="h-full py-1 outline-none w-full"
            placeholder="Username"
          />
        </label>
        {errors.username && (
          <span className="text-red-500 text-xs">
            Username is required (min 3 characters)
          </span>
        )}

        {/* Email */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <input
            {...register("email", { required: true })}
            className="h-full py-1 outline-none w-full"
            type="email"
            placeholder="mail@site.com"
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-xs">
            Email is required
          </span>
        )}

        {/* Password */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <input
            {...register("password", { required: true, minLength: 8 })}
            className="h-full py-1 outline-none w-full"
            type="password"
            placeholder="Password"
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-xs">
            Password must be at least 8 characters
          </span>
        )}

        {/* Confirm Password */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            className="h-full py-1 outline-none w-full"
            type="password"
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            Passwords do not match
          </span>
        )}

        <p className="text-sm text-center mt-1">
          Have an account?{" "}
          <Link to={"/login"} className="text-blue-600 cursor-pointer">Login</Link>
        </p>

        <button
          type="submit"
          className="btn btn-primary w-full h-10 mt-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
