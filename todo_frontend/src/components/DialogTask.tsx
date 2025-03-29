import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"
import { Task } from "@/lib/types"


interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: Omit<Task,"createdDate" | "modifiedDate">) => void
  defaultValues?: Task
  workSectionId: string
  title: string
  mode: "create" | "edit"
}

export default function TaskFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  workSectionId,
  title,
  mode,
}: Readonly<TaskFormDialogProps>) {
  const [formData, setFormData] = useState<Omit<Task,"id" | "createdDate" | "modifiedDate">>({
    title: "",
    description: "",
    priority: "MEDIUM",
    taskState: "PENDING",
    workSpaceID: workSectionId,
  })

  // Reset form when dialog opens or defaultValues change
  useEffect(() => {
    if (defaultValues && mode === "edit") {
      setFormData(defaultValues)
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        taskState: "PENDING",
        workSpaceID: workSectionId,
      })
    }
  }, [defaultValues, open, workSectionId, mode])

  const handleSubmit = () => {
    if (formData.title.trim()) {
        if(defaultValues){
            const id = defaultValues.id
            onSubmit({id, ...formData})
        }
        else 
            onSubmit({id:"",...formData})
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Titulo</Label>
            <Input
              id="task-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Task title"
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-description">Descripcion</Label>
            <Textarea
              id="task-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Task description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-priority">Prioridad</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger id="task-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {mode === "create"
            ? <div className="grid gap-2">
                <Label htmlFor="task-status">Estado</Label>
                <Select value={formData.taskState} onValueChange={(value) => setFormData({ ...formData, taskState: value })}>
                <SelectTrigger id="task-status">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="IN-PROGRESS">IN PROGRESS</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                </SelectContent>
                </Select>
              </div>
            : "" 
          }
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Agregar Tarea" : "Editar Tarea"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}