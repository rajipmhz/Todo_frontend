export type TodoStatus="pending"|"completed";


export interface Subtask{
    id:string;
    title:string;
    start_time:string;
    end_time:string;
    category:string;
    status:TodoStatus;
}


export interface Todo{
    id:string;
    date:string;
    day:string;
    title:string;
    start_time:string;
    end_time:string;
    category:string;
    status:TodoStatus;
    subtasks:Subtask[];
}