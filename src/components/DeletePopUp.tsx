import { createPortal } from "react-dom";

type DeleteConfirmProps = {
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

const DeleteConfirm = ({
  title = "Confirm Delete",
  message = "Are you sure?",
  confirmText = "Delete",
  onConfirm,
  onClose,
}: DeleteConfirmProps) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white p-6 rounded-xl w-80 shadow-lg z-10">
        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-600 ">{message}</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirm;
