import { yupResolver } from "@hookform/resolvers/yup";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
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
                        <label className="text-sm font-medium text-gray-700 ">
                            Current Password
                        </label>
                        <input
                        type="password"
                            {...register("currentPassword")}
                            className="border border-gray-300  rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="CurrentPassword"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.currentPassword?.message}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 ">
                            New Password
                        </label>
                        <input
                        type="password"
                            {...register("newPassword")}
                            className="border border-gray-300  rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="New Password"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.newPassword?.message}</p>
                    </div>



                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 ">
                            Confrim New Password
                        </label>
                        <input
                        type="password"
                            {...register("confirmPassword")}
                            className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm Password"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword?.message}</p>
                    </div>



                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 transition"
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
