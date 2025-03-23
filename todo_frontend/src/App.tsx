import { useEffect, useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import Board from "@/sections/Board"
import { createTaskRequest, Task } from "./lib/types"
import { createTask, deleteTask, getAllTask, updateTaskStatus } from "./api/taskService"

export default function TodoApp() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect( () => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTask();
        setTasks(data);
      }
      catch (error) {
        console.error("Error al obtener todos las tareas",error);
      }
    }

    fetchTasks();
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

  const handleDeleteTask = async(taskId:string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error al intentar eliminar una tarea: ",error)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <main className="flex-1 overflow-auto p-4">
            <Board
              tasks={tasks}
              onAddTask={handleAddTask}
              isDragging={isDragging}
            />
        </main>
    </DragDropContext>
  )
}

