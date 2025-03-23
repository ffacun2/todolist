import type React from "react"

import { Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"

interface TaskColumnProps {
  title: string
  columnId: string
  children: React.ReactNode
  onDragStart?: () => void
  onDragEnd?: () => void
}

export default function TaskColumn({ title, columnId, children, onDragStart, onDragEnd }: Readonly<TaskColumnProps>) {

  const getColumnHeaderColor = (id: string) => {
    switch (id) {
      case "PENDING":
        return "text-yellow-600 "
      case "IN_PROGRESS":
        return "text-blue-600 "
      case "COMPLETED":
        return "text-green-600"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col rounded-lg border-2 bg-card p-4 shadow-sm max-w-[500px] ">
      <h3 className={cn("mb-4 font-medium", getColumnHeaderColor(columnId))}>{title}</h3>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex flex-1 flex-col gap-3  min-h-[200px] rounded-md transition-colors",
              snapshot.isDraggingOver && "bg-primary/5",
            )}
            onDragEnter={onDragStart}
            onDragLeave={onDragEnd}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

