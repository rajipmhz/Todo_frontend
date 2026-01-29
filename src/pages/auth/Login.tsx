

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import type { loginData } from "../../types/auth";
import Auth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    email: yup.string().email("Invailds email").required("Enter you email"),
    password: yup.string().required("Enter your password"),
})


function Login() {
    const { loginMutation } = Auth();
    
    const navigate=useNavigate();

    const { register, reset,handleSubmit, formState: { errors } } = useForm<loginData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: loginData) => {
        loginMutation.mutate(data);
        reset();
    }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
         Login 
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <p className="text-xs text-red-500 mt-1">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <p className="text-xs text-red-500 mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
          hover:bg-blue-500 transition 
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
        >
          {loginMutation.isPending && (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loginMutation.isPending ? "Logging in..." : "Login"}
          
        </button>
       <p className="text-center text-sm text-gray-600">
          Register Now?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  </div>
);

}

export default Login;