import { useEffect, useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import Board from "@/sections/Board"
import { createSpaceRequest, createTaskRequest, Task, WorkSpace } from "./lib/types"
import { createTask, deleteTask, getTasksByWorkSpace, updateTask, updateTaskStatus } from "./api/taskService"
import SideBar from "./components/SideBar"
import Header from "./components/Header"
import { createWorkSpace, deleteWorkSpace, getAllWorkSpace, updateWorkSpace } from "./api/workSpaceService"


export default function TodoApp() {

  const [selectedSpace, setSelectedSpace] = useState<WorkSpace | null>(null)
  const [workSpaces, setWorkSpaces] = useState<WorkSpace[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDragging, setIsDragging] = useState(false)


  useEffect( () => {
    const fetchWorkSpace = async () => {
      try {
        const data = await getAllWorkSpace();
        setWorkSpaces(data);
      }
      catch (error) {
        console.error("Error al obtener los espacios de trabajo. ",error)
      }
    }

    fetchWorkSpace();
  },[])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false)
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // If the destination is the delete area
    if (destination.droppableId === "delete-area") {
      // Delete the task
      setTasks(tasks.filter((task) => task.id.toString() !== draggableId))
      // Call API to delete the task
      handleDeleteTask(draggableId)
      return
    }

    // Get the new status from the destination droppableId
    const newStatus = destination.droppableId
    // Update the task status
    const updatedTasks = tasks.map( (task) => 
        task.id.toString() === draggableId
          ? {...task, taskState: newStatus, modifiedDate: new Date(), } 
          : task
      );
    setTasks(updatedTasks);

    // Here you would also call the API to update the task status
    handleUpdateTaskStatus(draggableId, newStatus)

  }

  const handleAddTask = async (task: createTaskRequest) => {
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    catch (error) {
      console.error("error al crear una tarea:", error);
    }
  }
  
  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    try {
      await updateTaskStatus(taskId,status);
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  const handleUpdateTask = async (task:  Omit<Task, "createdDate" | "modifiedDate"> ) => {
    const dataTask: createTaskRequest = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      taskState: task.taskState,
      workSpaceID: task.workSpaceID,
    }
    try{
      const data = await updateTask(task.id,dataTask);
      setTasks((prevTasks) => prevTasks.map((task) => task.id === data.id ? data : task));
    }
    catch (error) {
      console.error("Error al intentar actualizar la tarea: ",error)
    }
  }

  const handleDeleteTask = async(taskId:string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error al intentar eliminar una tarea: ",error)
    }
  }

  const handleSelectSpace = async(space:WorkSpace) => {
    setSelectedSpace(space)
    try {
      const data = await getTasksByWorkSpace(space);
      setTasks(data);
    }
    catch (error) {
      console.error("Error al obtener las tareas del workspace ",space.id," ,",error);
    }
  }

  const handleAddWorkSpace = async(name:string) => {
    const newSpaceRequest: createSpaceRequest = {
      name
    }
    try {
      const newSpace = await createWorkSpace(newSpaceRequest);
      setWorkSpaces([...workSpaces,newSpace])
    }
    catch (error) {
      console.error("Error al intentar crear un espacio de trabajo, ",error)
    }

  }

  const handleUpdateWorkSpace = async(id:string, name:string) => {
    try {
      const data = await updateWorkSpace(id,{name})
      setWorkSpaces((prevWorkSpaces) => prevWorkSpaces.map((space) => space.id === data.id ? data : space))
    }
    catch (error) {
      console.error("Error al intentar actualizar el espacio de trabajo, ",error)
    }
  }

  const handleDeleteWorkSpace = async(id:string) => {
    try {
      await deleteWorkSpace(id);
      setWorkSpaces((prevWorkSpaces) => prevWorkSpaces.filter((space) => space.id !== id))
      if (selectedSpace?.id === id) {
        setSelectedSpace(null)
        setTasks([])
      }
    }
    catch (error) {
      console.error("Error al intentar eliminar el espacio de trabajo, ",error)
    }
  }


  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex h-screen flex-col">
        <Header appName="todolist"/>
        <div className="flex flex-1 overflow-hidden">
            <SideBar
              workSpaces={workSpaces}
              onSelectSpace={handleSelectSpace}
              onAddWorkSpace={handleAddWorkSpace}
              onEditWorkSpace={handleUpdateWorkSpace}
              onDeleteWorkSpace={handleDeleteWorkSpace}
              selectedSpace={selectedSpace}
            />
            <main className="flex-1 overflow-auto p-4">
              {
                selectedSpace 
                ? <Board
                  space={selectedSpace.id}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onEditTask={handleUpdateTask}
                  isDragging={isDragging}
                  />
                : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">
                        Seleccione un espacio de trabajo
                      </p>
                    </div>
                  )
              }
            </main>
          </div>
      </div>
    </DragDropContext>
  )
}

