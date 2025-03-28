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