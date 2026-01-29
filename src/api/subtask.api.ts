import api from "./axios";

export const getSubtasksApi = (todoId: string) =>
  
  api.get(`/todos/${todoId}/subtasks`);

export const createSubtaskApi = (todoId: string, data: any) =>
  api.post(`/todos/${todoId}/subtasks`, data);

export const updateSubtaskApi = (id: string, data: any) =>
  api.put(`/todos/subtasks/${id}`, data);

export const deleteSubtaskApi = (id: string) =>
  api.delete(`/todos/subtasks/${id}`);

