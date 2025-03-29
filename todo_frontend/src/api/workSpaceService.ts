import api from "@/api/apiWorkSpaceConfig"
import {createSpaceRequest, WorkSpace} from "@/lib/types"

export const getAllWorkSpace = async ():Promise<WorkSpace[]> => {
    const response = await api.get<WorkSpace[]>("");

    return response.data;
}

export const createWorkSpace = async (spaceData:createSpaceRequest):Promise<WorkSpace> => {
    const response = await api.post<WorkSpace>("",spaceData);
    return response.data;
}

export const updateWorkSpace = async (spaceId:string, spaceData:createSpaceRequest):Promise<WorkSpace> => {
    console.log(spaceId, spaceData)
    const response = await api.put<WorkSpace>(`/${spaceId}`,spaceData);
    return response.data;
}

export const deleteWorkSpace = async (spaceId:string):Promise<void> => {
    await api.delete<void>(`/${spaceId}`);
}