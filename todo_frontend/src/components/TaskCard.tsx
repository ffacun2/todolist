import { cn } from "@/lib/utils"

import { Draggable } from "@hello-pangea/dnd"
import type { Task } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  formatDistanceToNow } from "date-fns"
import { es } from 'date-fns/locale'
import { Badge } from "./ui/badge"
import { Edit } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import TaskFormDialog from "./DialogTask"

interface TaskCardProps {
  task: Task
  index: number
  onEditTask: (task:Omit<Task,"createdDate" | "modifiedDate">) => void
}

export default function TaskCard({ task, index, onEditTask }: Readonly<TaskCardProps>) {

  const [isEditing, setIsEditing] = useState(false);

  const priorityColors = {
    LOW: "bg-green-100 text-green-800 border-green-200",
    MEDIUM:"bg-yellow-100 text-yellow-800 border-yellow-200",
    HIGH: "bg-red-100 text-red-800 border-red-200",
  };


  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            " border p-1 gap-1 group",
            snapshot.isDragging
              ? "shadow-lg scale-[1.02] border-primary/50"
              : "hover:border-primary/30",
          )}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <CardHeader className="flex justify-between p-3 pb-0">
            <CardTitle className="text-sm font-medium text-center items-center">{task.title}</CardTitle>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {setIsEditing(true)}}>
              <Edit className="h-1 w-1"/>       
            </Button>
          </CardHeader>
          <CardContent className="p-3 pt-2 flex-1">
            <p className="text-xs text-muted-foreground">{task.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-3 pt-0">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", priorityColors[task.priority as keyof typeof priorityColors])}
            >
              {task.priority}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(task.modifiedDate,{addSuffix:true, locale:es})}
            </span>
          </CardFooter>

           {/* Edit Task Dialog */}
          <TaskFormDialog
            open={isEditing}
            onOpenChange={setIsEditing}
            onSubmit={onEditTask}
            defaultValues={task}
            workSectionId={task.workSpaceID}
            title="Editar Tarea"
            mode="edit"
          />
        </Card>
      )}
    </Draggable>
  )
}

