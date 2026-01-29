import { useState } from "react";
import { useTodos } from "../hooks/useTodo"
import type { Todo } from "../types/todo";
import SubtaskList from "./SubtaskList";
import DeleteConfirm from "./DeletePopUp";
import EditTask from "./EditTodo";

type TodoListProps = {
  search: string;
}
const TodoList = ({ search }: TodoListProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [showSubtasks, setShowSubtasks] = useState<string | null>(null);
  const { todosQuery, deleteTodo, updateTodo } = useTodos();

  if (todosQuery.isLoading) return <p>Loading todos ...</p>;
  if (todosQuery.isError) return <p className="text-red-500">Failed to load todos</p>;

  const todos = Array.isArray(todosQuery.data)
  ? todosQuery.data
  : [];
  
  const filteredTodos =
    search.trim() === ""
      ? todos
      : todos
        .filter((todo: any) =>
          todo.day.toLowerCase().includes(search.toLowerCase()) ||
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.category.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a: any, b: any) =>
          a.createdAt.localeCompare(b.createdAt)
        );

  const handledelete = (id: string) => {
    deleteTodo.mutate(id);
    setOpen(null);
  };

  const handleStatusChange = (todo: Todo) => {
    const newStatus = todo.status === "pending" ? "completed" : "pending";

    updateTodo.mutate({
      id: todo.id,
      data: { ...todo, status: newStatus }
    });
  };


return (
  <div className="p-1">

    {filteredTodos?.length === 0 && (
      <p className="mt-4 text-gray-500  text-center">
        No matching data found...
      </p>
    )}

    {filteredTodos?.map((todo: Todo) => (
      <div
        key={todo.id}
        className="hover:bg-gray-50  transition"
      >
        <div className="grid grid-cols-10 items-center py-2 px-2 text-sm">

          <div>{todo.date}</div>
          <div>{todo.day}</div>

          <div>
            <input
              type="checkbox"
              checked={todo.status === "completed"}
              onChange={() => handleStatusChange(todo)}
              className="h-4 w-4 accent-blue-600 cursor-pointer overflow-hidden"
            />
          </div>

          <div className="font-medium">{todo.title}</div>

          <div>{todo.start_time}</div>
          <div>{todo.end_time}</div>

          <div>
            <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
              {todo.category}
            </span>
          </div>

          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold
              ${
                todo.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {todo.status}
            </span>
          </div>

          <button
            className="text-blue-600 hover:underline"
            onClick={() =>
              setShowSubtasks(showSubtasks === todo.id ? null : todo.id)
            }
          >
            Subtasks
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(todo.id)}
              className="text-indigo-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => setOpen(todo.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>


        {showSubtasks === todo.id && (
          <div className="col-span-10 bg-gray-50">
            <SubtaskList todoId={todo.id} />
          </div>
        )}

        {isModalOpen === todo.id && (
          <EditTask
            title={todo.title}
            start_time={todo.start_time}
            end_time={todo.end_time}
            category={todo.category}
            onSave={(data: any) => updateTodo.mutate({ id: todo.id, data })}
            onClose={() => setIsModalOpen(null)}
          />
        )}


        {open === todo.id && (
          <DeleteConfirm
            title="Delete Todo"
            message="Are you sure you want to delete this todo?"
            onConfirm={() => handledelete(todo.id)}
            onClose={() => setOpen(null)}
          />
        )}
      </div>
    ))}
  </div>
);

};


export default TodoList
