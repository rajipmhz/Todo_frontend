import { useEffect, useState, Fragment } from "react";
import { useTodos } from "../hooks/useTodo";
import type { Todo } from "../types/todo";
import DeleteConfirm from "./DeletePopUp";
import EditTask from "./EditTodo";
import SubtaskList from "./SubtaskList";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddSubtaskPortal from "./AddSubtask";

type TodoListProps = {
  search: string;
}; 

const TodoList = ({ search }: TodoListProps) => {
  const { todosQuery, deleteTodo, updateTodo } = useTodos();
  const [open, setOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [showSubtasks, setShowSubtasks] = useState<string | null>(null);
  const [showAddSubtask,setShowAddSubtask]=useState<string | null>(null);
  const todos: Todo[] = Array.isArray(todosQuery.data)
    ? todosQuery.data
    : [];

  const columnHelper = createColumnHelper<Todo>();

  const columns = [
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("day", { header: "Day" }),

    columnHelper.display({
      id: "done",
      header: "Done",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.status === "completed"}
          onChange={() =>
            updateTodo.mutate({
              id: row.original.id,
              data: {
                ...row.original,
                status:
                  row.original.status === "pending"
                    ? "completed"
                    : "pending",
              },
            })
          }
          className="h-4 w-4 accent-blue-600"
        />
      ),
    }),

    columnHelper.accessor("title", { header: "Title" }),
    columnHelper.accessor("start_time", { header: "Start" }),
    columnHelper.accessor("end_time", { header: "End" }),

    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ getValue }) => (
        <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
          {getValue()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "subtasks",
      header: "Subtasks",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button>
            <button
            className="text-blue-600 text-xs hover:underline"
            onClick={() => setShowAddSubtask(row.original.id)}
          >
            + Add
          </button>

          {showAddSubtask===row.original.id  && (
            <AddSubtaskPortal todoId={row.original.id} onClose={() => setShowAddSubtask(null)} />
          )}
          </button>
        <button
          className="text-blue-600 hover:underline"
          onClick={() =>
            setShowSubtasks(
              showSubtasks === row.original.id ? null : row.original.id
            )
          }
        >
          showlist
        </button>
        </div>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${getValue() === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {getValue()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(row.original.id)}
            className="text-indigo-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => setOpen(row.original.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: todos,
    columns,
    state: {
      globalFilter: search,
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  useEffect(() => {
    table.setGlobalFilter(search);
  }, [search, table]);

  if (todosQuery.isLoading) return <p>Loading todos...</p>;
  if (todosQuery.isError)
    return <p className="text-red-500">Failed to load todos</p>;

  return (
    <div className="flex flex-col justify-center overflow-x-auto">
      <table>
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-sm font-semibold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 text-sm text-center"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>

              {showSubtasks === row.original.id && (
                <tr>
                  <td colSpan={columns.length} className="bg-gray-50">
                    <SubtaskList todoId={row.original.id} />
                  </td>
                </tr>
              )}
              
      
      {isModalOpen && (
        <EditTask
          title={row.original.title}
          start_time={row.original.start_time}
          end_time={row.original.end_time}
          category={row.original.category}
          onSave={(data: any) =>
            updateTodo.mutate({ id: row.original.id, data })
          }
          onClose={() => setIsModalOpen(null)}
        />
      )}

            </Fragment>
          ))}
        </tbody>
      </table>

 
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {open && (
        <DeleteConfirm
          title="Delete Todo"
          message="Are you sure?"
          onConfirm={() => {
            deleteTodo.mutate(open);
            setOpen(null);
          }}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
};

export default TodoList;
