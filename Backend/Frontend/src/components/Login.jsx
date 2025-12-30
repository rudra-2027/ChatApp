import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password
    }
    console.log(data)
    axios.post("/api/user/login", loginInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast("Login Successfully")
        }
        localStorage.setItem("message", JSON.stringify(res.data))

      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.error)
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
          Login with your{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Email */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </g>
          </svg>

          <input
            {...register("email", { required: true })}
            className="h-full py-1 outline-none w-full"
            type="email"
            placeholder="mail@site.com"
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-xs">Email is required</span>
        )}

        {/* Password */}
        <label className="input validator h-10 gap-2 w-full flex items-center">
          <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </g>
          </svg>

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

        <p className="text-sm text-center mt-1">
          Didn't have any account?{" "}
          <Link to={"/signup"} className="text-blue-600 cursor-pointer">SignUp</Link>
        </p>

        <button type="submit" className="btn btn-primary w-full h-10 mt-2">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
