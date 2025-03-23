export interface Task {
  id: string
  title: string
  description: string
  priority: string
  createdDate: Date
  modifiedDate: Date
  taskState: string
}

export interface createTaskRequest {
  title:string,
  description:string,
  priority:string,
  taskState:string
}


