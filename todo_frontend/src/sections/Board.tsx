import { useState } from "react"
import type { Task } from "@/lib/types"
import TaskCard from "@/components/TaskCard"
import TaskColumn from "@/components/TaskColumn"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"

interface BoardProps {
  tasks: Task[]
  onAddTask: (task: Omit<Task, "id" | "createdDate" | "modifiedDate">) => void
  isDragging: boolean
}

export default function Board({ tasks, onAddTask, isDragging}: Readonly<BoardProps>) {
  
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    taskState: "PENDING",
  })


  const pendingTasks = tasks.filter((task) => task.taskState === "PENDING")
  const inProgressTasks = tasks.filter((task) => task.taskState === "IN_PROGRESS")
  const completedTasks = tasks.filter((task) => task.taskState === "COMPLETED")

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask(newTask)
      setNewTask({
        title: "",
        description: "",
        priority: "MEDIUM",
        taskState: "PENDING",
      })
      setIsAddingTask(false)
    }
  }


  return (
    <div className="h-full w-[90%] md:w-[80%] justify-self-center">
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

        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Agregar Tarea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Tarea</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newTask.taskState} onValueChange={(value) => setNewTask({ ...newTask, taskState: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pendiente</SelectItem>
                    <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                    <SelectItem value="COMPLETED">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddTask}>Agregar Tarea</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid h-[calc(100%-80px)] w-full md:w-[95%] justify-self-center grid-cols-1 md:grid-cols-3 gap-3">
        <TaskColumn 
          title="Pendiente" 
          columnId="PENDING" 
        >
          {pendingTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>

        <TaskColumn 
          title="En Progreso" 
          columnId="IN_PROGRESS"
        >
          {inProgressTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>

        <TaskColumn 
          title="Completado" 
          columnId="COMPLETED"
        >
          {completedTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>
      </div>
    </div>
  )
}

