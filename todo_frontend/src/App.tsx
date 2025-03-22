"use client"

import { useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import Board from "@/sections/Board"
import { Task } from "./lib/types"

export default function TodoApp() {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new homepage",
      description: "Create wireframes and mockups for the new homepage",
      priority: "high",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "2",
      title: "Implement authentication",
      description: "Add login and registration functionality",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "in-progress",
    },
    {
      id: "3",
      title: "Write documentation",
      description: "Document the API endpoints and usage",
      priority: "low",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "completed",
    },
    {
      id: "4",
      title: "Fix navigation bug",
      description: "Fix the navigation menu not working on mobile",
      priority: "high",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
    },
  ])


  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Get the new status from the destination droppableId
    const newStatus = destination.droppableId

    // Update the task status
    setTasks(
      tasks.map((task) =>
        task.id === draggableId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task,
      ),
    )

    // Here you would also call the API to update the task status
    updateTaskStatus(draggableId, newStatus)
  }

  const handleAddTask = async (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])

    // Here you would also call the API to create the task
    createTask(newTask)
  }

  // API communication methods
  const createTask = async (task: Task) => {
    try {
      // Example API call
      // const response = await fetch('/api/tasks', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(task)
      // })
      // return await response.json()
      console.log("Creating task:", task)
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      // Example API call
      // const response = await fetch(`/api/tasks/${taskId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // })
      // return await response.json()
      console.log("Updating task status:", taskId, status)
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <main className="flex-1 overflow-auto p-4">
            <Board
              tasks={tasks}
              onAddTask={handleAddTask}
            />
        </main>
    </DragDropContext>
  )
}

