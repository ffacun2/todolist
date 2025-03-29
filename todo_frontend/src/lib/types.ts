export interface Task {
  id: string
  title: string
  description: string
  priority: string
  createdDate: Date
  modifiedDate: Date
  taskState: string
  workSpaceID:string
}

export interface createTaskRequest {
  title:string,
  description:string,
  priority:string,
  taskState:string
  workSpaceID:string
}

export interface WorkSpace {
  id: string,
  name: string,
}

export interface createSpaceRequest {
  name: string,
}

