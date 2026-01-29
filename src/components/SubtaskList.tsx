import { useState } from "react";
import { useSubtasks } from "../hooks/useSubtasks";
import type { Subtask } from "../types/todo";
import DeleteConfirm from "./DeletePopUp";
import EditTask from "./EditTodo";
import AddSubtaskPortal from "./AddSubtask";

type Props = {
  todoId: string;
};

const SubtaskList = ({ todoId }: Props) => {
  const [open, setOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const { subtasksQuery, deleteSubtask, updateSubtask } = useSubtasks(todoId);

  const handledelete = (id: string) => {
    deleteSubtask.mutate(id);
    setOpen(null);
  };

  const handleStatusChange = (todo: Subtask) => {
    const newStatus = todo.status === "pending" ? "completed" : "pending";
    updateSubtask.mutate({ id: todo.id, data: { ...todo, status: newStatus } });
  };

  if (subtasksQuery.isLoading)
    return <p className="ml-10 text-gray-500">Loading subtasks...</p>;

  if (subtasksQuery.isError)
    return <p className="ml-10 text-red-500">Failed to load subtasks</p>;

  const subtasks: Subtask[] = subtasksQuery.data || [];

  return (
    <div className="p-1 border-gray-200">

      {subtasks.length === 0 && (
        <div className="py-2">
          <button
            className="text-blue-600 text-xs hover:underline"
            onClick={() => setShowAddSubtask(true)}
          >
            + Add Subtask
          </button>

          {showAddSubtask && (
            <AddSubtaskPortal todoId={todoId} onClose={() => setShowAddSubtask(false)} />
          )}
        </div>
      )}

      {subtasks.map((sub) => (
        <div
          key={sub.id}
          className="grid grid-cols-10 items-center py-2 text-sm hover:bg-gray-100 transition"
        >
          <div></div>
          <div></div>

          <div>
            <input
              type="checkbox"
              checked={sub.status === "completed"}
              onChange={() => handleStatusChange(sub)}
              className="h-4 w-4 accent-blue-600 cursor-pointer overflow-hidden"
            />
          </div>

          <div className="font-medium">{sub.title}</div>

          <div>{sub.start_time}</div>
          <div>{sub.end_time}</div>
          <div></div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold
              ${sub.status === "completed"
                ? "bg-green-100 text-green-700 "
                : "bg-yellow-100 text-yellow-700 "
              }`}
            >
              {sub.status}
            </span>
          </div>

          <div>
            <button
              className="text-blue-600 text-xs hover:underline"
              onClick={() => setShowAddSubtask(true)}
            >
              + Add
            </button>
            {showAddSubtask && (
              <AddSubtaskPortal todoId={todoId} onClose={() => setShowAddSubtask(false)} />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(sub.id)}
              className="text-indigo-600 text-xs hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => setOpen(sub.id)}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
          </div>

          {isModalOpen === sub.id && (
            <EditTask
              title={sub.title}
              start_time={sub.start_time}
              end_time={sub.end_time}
              showCategory={false}
              onSave={(data: any) => updateSubtask.mutate({ id: sub.id, data })}
              onClose={() => setIsModalOpen(null)}
            />
          )}

          {/* Delete confirm */}
          {open === sub.id && (
            <DeleteConfirm
              title="Delete Subtask"
              message="Are you sure you want to delete this task?"
              onConfirm={() => handledelete(sub.id)}
              onClose={() => setOpen(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SubtaskList;
