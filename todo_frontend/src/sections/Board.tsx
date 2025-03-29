import { useState } from "react"
import type { Task } from "@/lib/types"
import TaskCard from "@/components/TaskCard"
import TaskColumn from "@/components/TaskColumn"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import TaskFormDialog from "@/components/DialogTask"


interface BoardProps {
  space: string
  tasks: Task[]
  onAddTask: (task: Omit<Task, "id" | "createdDate" | "modifiedDate">) => void
  onEditTask: (task: Omit<Task,"createdDate" | "modifiedDate">) => void
  isDragging: boolean
}

export default function Board({
  space,
  tasks,
  onAddTask,
  onEditTask,
  isDragging,
}: Readonly<BoardProps>) {
  
  const [isAddingTask, setIsAddingTask] = useState(false);



  const pendingTasks = tasks.filter((task) => task.taskState === "PENDING")
  const inProgressTasks = tasks.filter((task) => task.taskState === "IN_PROGRESS")
  const completedTasks = tasks.filter((task) => task.taskState === "COMPLETED")

  return (
    <div className="h-full w-[90%] md:w-[95%] justify-self-center">
      <div className=" mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Tareas</h2>
        {/* Delete area - only visible when dragging */}
          <Droppable droppableId="delete-area">
            {(provided, snapshot) => (
              <div className="w-10 h-10">
                <Button
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "transition-all duration-300 cursor-pointer ease-in-out overflow-hidden",
                    isDragging ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none",
                    "gap-1 transition-colors",
                    snapshot.isDraggingOver && "bg-destructive/90 animate-pulse",
                  )}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar Tarea
                </Button>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          
          <Button className="gap-1" onClick={() => setIsAddingTask(true)}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>

          <TaskFormDialog
            open={isAddingTask}
            onOpenChange={setIsAddingTask}
            onSubmit={onAddTask}
            workSectionId={space}
            title="Agregar Nueva Tarea"
            mode="create"
          />
      </div>

      <div className="grid h-[calc(100%-80px)] w-full md:w-[95%] justify-self-center grid-cols-1 md:grid-cols-3 gap-3">
        <TaskColumn 
          title="Pendiente" 
          columnId="PENDING" 
        >
          {pendingTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onEditTask={onEditTask} />
          ))}
        </TaskColumn>

        <TaskColumn 
          title="En Progreso" 
          columnId="IN_PROGRESS"
        >
          {inProgressTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onEditTask={onEditTask} />
          ))}
        </TaskColumn>

        <TaskColumn 
          title="Completado" 
          columnId="COMPLETED"
        >
          {completedTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onEditTask={onEditTask} />
          ))}
        </TaskColumn>
      </div>
    </div>
  )
}

