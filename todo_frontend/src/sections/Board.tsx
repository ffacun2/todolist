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
import { Plus } from "lucide-react"

interface BoardProps {
  tasks: Task[]
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
}

export default function Board({ tasks, onAddTask }: BoardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  })

  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask(newTask)
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
      })
      setIsAddingTask(false)
    }
  }

  return (
    <div className="h-full w-[80%] justify-self-center">
      <div className=" mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Tareas</h2>
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
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddTask}>Agregar Tarea</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid h-[calc(100%-80px)] w-[80%] justify-self-center grid-cols-1 md:grid-cols-3 gap-3">
        <TaskColumn title="Pending" columnId="pending">
          {pendingTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>

        <TaskColumn title="In Progress" columnId="in-progress">
          {inProgressTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>

        <TaskColumn title="Completed" columnId="completed">
          {completedTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </TaskColumn>
      </div>
    </div>
  )
}

