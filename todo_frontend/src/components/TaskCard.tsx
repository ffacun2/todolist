import { cn } from "@/lib/utils"

import { Draggable } from "@hello-pangea/dnd"
import type { Task } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  formatDistanceToNow } from "date-fns"
import { Badge } from "./ui/badge"

interface TaskCardProps {
  task: Task
  index: number
}

export default function TaskCard({ task, index }: Readonly<TaskCardProps>) {

  const priorityColors = {
    LOW: "bg-green-100 text-green-800 border-green-200",
    MEDIUM:"bg-yellow-100 text-yellow-800 border-yellow-200",
    HIGH: "bg-red-100 text-red-800 border-red-200",
  };


  console.log(task);
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            " border p-1 gap-1",
            snapshot.isDragging
              ? "shadow-lg scale-[1.02] border-primary/50"
              : "hover:border-primary/30",
          )}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
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
              {formatDistanceToNow(task.modifiedDate,{addSuffix:true})}
            </span>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  )
}

