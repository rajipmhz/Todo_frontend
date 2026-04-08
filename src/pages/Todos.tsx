import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import TodoList from "../components/TodoList";
import AddTodoPortal from "../components/AddTodo";
import Search from "../components/SearchButton";

const Todos = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <Search value={search} onChange={setSearch} />

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg shadow"
          >
            + Add Todo
          </button>
        </div>

        {open && <AddTodoPortal onClose={() => setOpen(false)} />}

        <div className="bg-white rounded-xl shadow p-4">
          <TodoList search={search} />
        </div>
      </main>
    </div>
  );
};

export default Todos;

