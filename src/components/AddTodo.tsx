import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTodos } from "../hooks/useTodo";
import { createPortal } from "react-dom";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup.string().required("Date is required"),
  day: yup.string().required("Day is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  category: yup.string().required("Category is required"),
});

type Props = {
  onClose: () => void;
};

const AddTodoPortal = ({ onClose }: Props) => {
  const { createTodo } = useTodos();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    createTodo.mutate({ ...data, status: "pending" });
    reset();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="relative z-10 flex items-center justify-center py-12 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl w-full p-6 bg-white rounded-lg shadow space-y-4"
        >
          <h2 className="flex justify-center text-2xl font-bold text-gray-800 mb-4">
            Create Todo
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Todo title"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.title?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.date?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                {...register("day")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <p className="text-xs text-red-500 mt-1">
                {errors.day?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                {...register("start_time")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.start_time?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                {...register("end_time")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.end_time?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category")}
                className="border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
              <p className="text-xs text-red-500 mt-1">
                {errors.category?.message}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
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

export default AddTodoPortal;
