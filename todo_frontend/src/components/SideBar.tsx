import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import type { WorkSpace } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SidebarProps {
  workSpaces: WorkSpace[]
  selectedSpace: WorkSpace | null
  onSelectSpace: (space: WorkSpace) => void
  onAddWorkSpace: (name: string) => void
}

export default function SideBar({ workSpaces, selectedSpace, onSelectSpace, onAddWorkSpace }: Readonly<SidebarProps>) {
  const [isAddingSpace, setIsAddingSpace] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")

  const handleAddSpace = () => {
    if (newSectionName.trim()) {
      onAddWorkSpace(newSectionName.trim())
      setNewSectionName("")
      setIsAddingSpace(false)
    }
  }

  return (
    <aside className="w-64 border-r bg-card/50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-primary">Espacio de Trabajos</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsAddingSpace(true)} className="hover:bg-primary/10">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add section</span>
        </Button>
      </div>

      {isAddingSpace && (
        <div className="mb-4 flex gap-2">
          <Input
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder="Section name"
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSpace()
              if (e.key === "Escape") setIsAddingSpace(false)
            }}
            autoFocus
          />
          <Button size="sm" onClick={handleAddSpace} className="h-9">
            Agregar
          </Button>
        </div>
      )}

      <nav className="space-y-1 mt-2">
        {workSpaces.map((space) => (
          <button
            key={space.id}
            onClick={() => onSelectSpace(space)}
            className={cn(
              "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
              selectedSpace?.id === space.id
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-primary/10 text-foreground/80",
            )}
          >
            {space.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}