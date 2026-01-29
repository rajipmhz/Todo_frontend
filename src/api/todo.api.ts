import api from "./axios";

export const getTodosApi=()=> 
    api.get("/todos");

export const createTodoApi = (data: any) =>
  api.post("/todos", data);

export const updateTodoApi = (id: string, data: any) =>
  api.put(`/todos/${id}`, data);

export const deleteTodoApi = (id: string) =>
  api.delete(`/todos/${id}`);
