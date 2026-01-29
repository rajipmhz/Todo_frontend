import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import TodoList from "../components/TodoList";
import AddTodoPortal from "../components/AddTodo";
import Search from "../components/SearchButton";

const Todos = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100  duration-300">
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <Search value={search} onChange={setSearch} />

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg
              shadow font-semibold transition"
            >
              + Add Todo
            </button>

            {open && <AddTodoPortal onClose={() => setOpen(false)} />}
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl shadow overflow-hidden min-w-[800px]">
              <div className="grid grid-cols-10 text-sm font-semibold text-gray-700 bg-gray-100">
                <div>Date</div>
                <div>Day</div>
                <div>Check</div>
                <div>Task</div>
                <div>Start</div>
                <div>End</div>
                <div>Category</div>
                <div>Status</div>
                <div>Subtask</div>
                <div>Action</div>
              </div>
              <div className="text-sm">
                <TodoList search={search} />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Todos;
