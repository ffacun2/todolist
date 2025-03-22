import type React from "react"

import { Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"

interface TaskColumnProps {
  title: string
  columnId: string
  children: React.ReactNode
}

export default function TaskColumn({ title, columnId, children }: TaskColumnProps) {

  const getColumnHeaderColor = (id: string) => {
    switch (id) {
      case "pending":
        return "text-yellow-600 "
      case "in-progress":
        return "text-blue-600 "
      case "completed":
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
              "flex flex-1 flex-col gap-3 overflow-auto min-h-[200px] rounded-md transition-colors",
              snapshot.isDraggingOver && "bg-primary/5",
            )}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

