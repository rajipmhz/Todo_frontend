import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createPortal } from "react-dom";
import { useSubtasks } from "../hooks/useSubtasks";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
});

type Props = {
  todoId: string;
  onClose: () => void;
};

const AddSubtaskPortal = ({ todoId, onClose }: Props) => {
  const { createSubtask } = useSubtasks(todoId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    createSubtask.mutate({ ...data, status: "pending" });
    reset();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white  p-6 rounded-xl w-80 shadow-lg z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Add Subtask
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

    
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              {...register("title")}
              className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Subtask title"
            />
            <p className="text-xs text-red-500 mt-1">{errors.title?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              {...register("start_time")}
              className="border border-gray-300  rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-red-500 mt-1">{errors.start_time?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 ">End Time</label>
            <input
              type="time"
              {...register("end_time")}
              className="border border-gray-300  rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-red-500 mt-1">{errors.end_time?.message}</p>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100  transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition"
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

export default AddSubtaskPortal;
