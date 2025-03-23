import api from "./apiTaskConfig"
import {createTaskRequest, Task} from "../lib/types"

export const getAllTask = async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("");

    return response.data;
};

export const createTask = async (taskData: createTaskRequest):Promise<Task> => {
    const response = await api.post<Task>("",taskData);
    return response.data;
};

export const updateTaskStatus = async (taskId:string, taskState:string):Promise<Task> => {
    const response = await api.patch<Task>(`/${taskId}/status?state=${taskState}`);
    return response.data;
}

export const deleteTask = async (taskId:string):Promise<Task> => {
    const response = await api.delete<Task>(`/${taskId}`)
    return response.data;
}