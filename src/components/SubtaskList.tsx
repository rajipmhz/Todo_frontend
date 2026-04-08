import { useState } from "react";
import { useSubtasks } from "../hooks/useSubtasks";
import type { Subtask } from "../types/todo";
import DeleteConfirm from "./DeletePopUp";
import EditTask from "./EditTodo";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Props = {
  todoId: string; 
};

const SubtaskList = ({ todoId }: Props) => {
  const [open, setOpen] = useState<string | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const { subtasksQuery, deleteSubtask, updateSubtask } = useSubtasks(todoId);

  const subtasks: Subtask[] = Array.isArray(subtasksQuery.data) ? subtasksQuery.data : [];

  const columnHelper = createColumnHelper<Subtask>();

  const columns = [
    columnHelper.display({
      id: "done",
      header: "Done",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.status === "completed"}
          onChange={() => {
            const newStatus = row.original.status === "pending" ? "completed" : "pending";
            updateSubtask.mutate({
              id: row.original.id,
              data: { ...row.original, status: newStatus },
            });
          }}
          className="h-4 w-4 accent-blue-600"
        />
      ),
    }),

    columnHelper.accessor("title", { header: "Title" }),
    columnHelper.accessor("start_time", { header: "Start" }),
    columnHelper.accessor("end_time", { header: "End" }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(row.original.id)}
            className="text-indigo-600 text-xs hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => setOpen(row.original.id)}
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: subtasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (id: string) => {
    deleteSubtask.mutate(id);
    setOpen(null);
  };


  if (subtasksQuery.isLoading)
    return <p className="ml-10 text-gray-500">Loading subtasks...</p>;

  if (subtasksQuery.isError)
    return <p className="ml-10 text-red-500">Failed to load subtasks</p>;

  return (
    <div className="p-2 border-t">
      {subtasks.length === 0 && <div>No subtasks for this Todo.</div>}

      <table>
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-sm font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 text-sm text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EditTask
          title={subtasks.find((sub) => sub.id === isModalOpen)?.title || ""}
          start_time={subtasks.find((sub) => sub.id === isModalOpen)?.start_time || ""}
          end_time={subtasks.find((sub) => sub.id === isModalOpen)?.end_time || ""}
          showCategory={false}
          onSave={(data: any) =>
            updateSubtask.mutate({ id: isModalOpen, data })
          }
          onClose={() => setIsModalOpen(null)}
        />
      )}

      {open && (
        <DeleteConfirm
          title="Delete Subtask"
          message="Are you sure you want to delete this subtask?"
          onConfirm={() => handleDelete(open)}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
};

export default SubtaskList;
