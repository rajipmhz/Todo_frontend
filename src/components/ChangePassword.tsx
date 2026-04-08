import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as yup from "yup";

const schema = yup.object({
    currentPassword: yup
        .string()
        .required("Current password is required"),

    newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),

    confirmPassword: yup
        .string()
        .required("Please confirm your new password")
        .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});


type Props = {
    onClose: () => void;
}
const ChangePassword = ({
    onClose
}: Props) => {

    const [showPassword, setShowPassword] = useState({
        current:false,
        new:false,
        confirm:false,
    })

    const togglePassword = (key: "current" | "new" | "confirm") => {
  setShowPassword(prev => ({
    ...prev,
    [key]: !prev[key],
  }));
};

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative bg-white  p-6 rounded-xl w-80 shadow-lg z-10">
                <h2 className="text-xl font-bold text-gray-800  mb-4">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="flex flex-col">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Current Password
                            </label>

                            <input
                                type={showPassword.current ? "text" : "password"}
                                {...register("currentPassword")}
                                placeholder="Enter your password"
                                className="w-full px-4 pr-10 py-2 rounded-lg border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => togglePassword("current")}
                                className="absolute inset-y-0 mt-6 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.current ? (
                                    <AiOutlineEye size={30} />
                                ) : (
                                    <AiOutlineEyeInvisible size={30} />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-red-500 mt-1">
                            {errors.currentPassword?.message}</p>
                    </div>


                   <div className="flex flex-col">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                New Password
                            </label>

                            <input
                                type={showPassword.new ? "text" : "password"}
                                {...register("newPassword")}
                                placeholder="Enter your password"
                                className="w-full px-4 pr-10 py-2 rounded-lg border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => togglePassword("new")}
                                className="absolute inset-y-0 mt-6 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.new ? (
                                    <AiOutlineEye size={30} />
                                ) : (
                                    <AiOutlineEyeInvisible size={30} />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-red-500 mt-1">
                            {errors.newPassword?.message}</p>
                    </div>


 <div className="flex flex-col">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Confirm New Password 
                            </label>

                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                {...register("confirmPassword")}
                                placeholder="Enter your password"
                                className="w-full px-4 pr-10 py-2 rounded-lg border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => togglePassword("confirm")}
                                className="absolute inset-y-0 mt-6 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.confirm ? (
                                    <AiOutlineEye size={30} />
                                ) : (
                                    <AiOutlineEyeInvisible size={30} />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-red-500 mt-1">
                            {errors.confirmPassword?.message}</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700  hover:text-red-500 transition"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold  transition"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>,
        document.body
    );
};

export default ChangePassword;
