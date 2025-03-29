import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreVertical, Plus, Trash2 } from "lucide-react"
import type { WorkSpace } from "@/lib/types"
import { cn } from "@/lib/utils"
import DialogWorkSpace from "./DialogSpaceWork"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { AlertDialog, 
      AlertDialogAction, 
      AlertDialogCancel, 
      AlertDialogContent, 
      AlertDialogDescription, 
      AlertDialogFooter, 
      AlertDialogHeader, 
      AlertDialogTitle } from "./ui/alert-dialog"

interface SidebarProps {
  workSpaces: WorkSpace[]
  selectedSpace: WorkSpace | null
  onSelectSpace: (space: WorkSpace) => void
  onAddWorkSpace: (name: string) => void
  onEditWorkSpace: (workSpaceId: string, newName: string) => void
  onDeleteWorkSpace: (workSpaceId: string) => void
}


export default function SideBar({
  workSpaces, 
  selectedSpace, 
  onSelectSpace, 
  onAddWorkSpace,
  onEditWorkSpace,
  onDeleteWorkSpace,
}: Readonly<SidebarProps>) {
  const [isAddingSpace, setIsAddingSpace] = useState(false)
  const [editingWorkSpace, setEditingWorkSpace] = useState<WorkSpace | null>(null)
  const [deletingWorkSpaceId, setDeletingWorkSpaceId] = useState<string | null>(null)


  const handleEditSection = (name: string, id?: string) => {
    if (id) {
      onEditWorkSpace(id, name)
    }
  }

  const handleDeleteSpace = () => {
    if (deletingWorkSpaceId) {
      onDeleteWorkSpace(deletingWorkSpaceId)
      setDeletingWorkSpaceId(null)
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

      {/* Add Section Dialog */}
      <DialogWorkSpace
        open={isAddingSpace}
        onOpenChange={setIsAddingSpace}
        onSubmit={onAddWorkSpace}
        title="Agregar Nuevo Espacio de Trabajo"
        mode="create"
      />

      {/* Edit Section Dialog */}
      <DialogWorkSpace
        open={!!editingWorkSpace}
        onOpenChange={(open) => !open && setEditingWorkSpace(null)}
        onSubmit={handleEditSection}
        defaultValues={editingWorkSpace || undefined}
        title="Editar Espacio de Trabajo"
        mode="edit"
      />

      <nav className="space-y-1 mt-2">
        {workSpaces.map((space) => (
          <div key={space.id} className="flex items-center group">
            <button
              onClick={() => onSelectSpace(space)}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-left text-sm transition-colors",
                selectedSpace?.id === space.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-primary/10 text-foreground/80",
              )}
            >
              {space.name}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
                    selectedSpace?.id === space.id && "text-primary-foreground",
                  )}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Mas opciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingWorkSpace(space)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={()=>setDeletingWorkSpaceId(space.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </nav>

      {/* Delete Section Confirmation */}
      <AlertDialog open={!!deletingWorkSpaceId} onOpenChange={(open) => !open && setDeletingWorkSpaceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto eliminara el espacio de trabajo y todas las tareas asociadas. Esta accion no puede ser deshecha.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSpace}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  )
}