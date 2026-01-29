import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTodoApi, deleteTodoApi, getTodosApi, updateTodoApi } from "../api/todo.api";

export const useTodos=()=>{
    const queryClient=useQueryClient();

    const todosQuery=useQuery({
        queryKey:["todos"],
        queryFn:async()=>{
            const res=await getTodosApi();
            return res.data;
        }
    })

    const createTodo=useMutation({
        mutationFn:createTodoApi,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:["todos"]}),
    })
    
const updateTodo = useMutation({
  mutationFn: ({ id, data }: any) => updateTodoApi(id, data),
  onSuccess: (response) => {
    const updatedTodo = response.data;

    queryClient.setQueryData(["todos"], (old: any) => {
      return old.map((todo: any) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      );
    });
  },
});

  const deleteTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return { todosQuery, createTodo, updateTodo, deleteTodo };
}