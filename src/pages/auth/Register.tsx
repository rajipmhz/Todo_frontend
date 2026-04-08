import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import type { registerData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import Auth from "../../hooks/auth";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = yup.object({
  name: yup.string().matches(/^[A-Za-z\s]+$/, "Only letters are allowed").required("lastname is required"),
  email: yup.string().email("Invailds email").matches(/^[^\s@]+@[^\s@]+\.com$/, "Only .com emails allowed").required("Enter you email"),
  password: yup.string().required("Enter your password"),
})


function Register() {
  const { registerMutation } = Auth();
const [showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: registerData) => {
    registerMutation.mutate({ ...data });
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-white/10 backdrop-blur  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-black p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <p className="text-xs text-red-500 mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
          </div>
{/* 
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
          </div> */}
             <div className="relative">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                      </label>
          
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter your password"
                        className="w-full px-4 pr-10 py-2 rounded-lg border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      />
          
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 mt-6 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible size={30} />
                        ) : (
                          <AiOutlineEye size={30} />
                        )}
                      </button>
                    </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
          hover:bg-blue-500 transition duration-300 shadow-md"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );

}

export default Register;