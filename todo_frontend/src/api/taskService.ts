import api from "./apiTaskConfig"
import {createTaskRequest, Task, WorkSpace} from "../lib/types"

export const getAllTask = async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("");

    return response.data;
};

export const getTasksByWorkSpace = async(workSpace:WorkSpace):Promise<Task[]> => {
    const response = await api.get<Task[]>(`${workSpace.id}`)
    
    return response.data;
};

export const createTask = async (taskData: createTaskRequest):Promise<Task> => {
    const response = await api.post<Task>("",taskData);
    return response.data;
};

export const updateTask = async (taskId:string, dataTask:createTaskRequest):Promise<Task> => {
    const response = await api.put<Task>(`/${taskId}`, dataTask);
    return response.data;
}

export const updateTaskStatus = async (taskId:string, taskState:string):Promise<Task> => {
    const response = await api.patch<Task>(`/${taskId}/status?state=${taskState}`);
    return response.data;
}

export const deleteTask = async (taskId:string):Promise<Task> => {
    const response = await api.delete<Task>(`/${taskId}`)
    return response.data;
}