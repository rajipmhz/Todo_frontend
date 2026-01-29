import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../api/auth.api";
import type { loginData, registerData } from "../types/auth";
import toast from "react-hot-toast";

export const Auth=()=>{
    const queryClient=useQueryClient();
    const navigate= useNavigate();
    const { login } = useAuthContext();
    const loginMutation= useMutation({
        mutationFn: async (data: loginData) => {
            const response = await loginApi(data);
            return response.data;
        },
        onSuccess: (data) => {
            login(
                { id: data.id, name: data.name, email: data.email },
                data.accessToken
            );
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success(" Login Successfully");
            navigate('/todos');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Login failed");
        }
    });
   const registerMutation=useMutation({
    mutationFn:async(data:registerData)=>{
        const response= await registerApi(data);
        return response.data;
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['users']})
        toast.success("Successfully registered");
    },
     onError: (error: any) => {
            toast.error(error.response?.data?.message || "Registration failed");
        }

   })
    return{loginMutation,registerMutation}
}


export default Auth;