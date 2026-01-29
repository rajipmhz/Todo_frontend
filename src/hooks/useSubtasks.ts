import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubtasksApi,
  createSubtaskApi,
  updateSubtaskApi,
  deleteSubtaskApi,
} from "../api/subtask.api";

export const useSubtasks = (todoId: string) => {
  const queryClient = useQueryClient();

  const subtasksQuery = useQuery({
    queryKey: ["subtasks", todoId],
    queryFn: async () => {
      const res = await getSubtasksApi(todoId);
      return res.data;
    },
    enabled: !!todoId,
  });

  const createSubtask = useMutation({
    mutationFn: (data: any) => createSubtaskApi(todoId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subtasks", todoId] }),
  });

const updateSubtask = useMutation({
  mutationFn: ({ id, data }: any) => updateSubtaskApi(id, data),
  onSuccess: (response) => {
    const updatedSubtask = response.data; // the actual updated subtask

    queryClient.setQueryData(["subtasks", todoId], (old: any) => {
      return old.map((subtask: any) =>
        subtask.id === updatedSubtask.id ? { ...subtask, ...updatedSubtask } : subtask
      );
    });
  },
});

  const deleteSubtask = useMutation({
    mutationFn: deleteSubtaskApi,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subtasks", todoId] }),
  });

  return { subtasksQuery, createSubtask, updateSubtask, deleteSubtask };
};
