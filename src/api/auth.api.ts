import type { loginData, registerData } from "../types/auth";
import api from "./axios"


export const registerApi=(data:registerData)=>{
   return  api.post("/auth/register",data);
}

export const loginApi=(data:loginData)=>{
   return api.post("/auth/login",data);
}

export const logoutApi=()=>{
    return api.post("/auth/logout");
}

export const refreshApi=()=>{
 return  api.post("/auth/refresh");
 }