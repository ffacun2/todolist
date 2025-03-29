import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { WorkSpace } from "@/lib/types"

interface WorkSectionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string, id?: string) => void
  defaultValues?: WorkSpace
  title: string
  mode: "create" | "edit"
}

export default function DialogWorkSpace({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  title,
  mode,
}: Readonly<WorkSectionFormDialogProps>) {
  const [sectionName, setSectionName] = useState("")

  // Reset form when dialog opens or defaultValues change
  useEffect(() => {
    if (defaultValues && mode === "edit") {
      setSectionName(defaultValues.name)
    } else {
      setSectionName("")
    }
  }, [defaultValues, open, mode])

  const handleSubmit = () => {
    if (sectionName.trim()) {
      if (mode === "edit" && defaultValues) {
        onSubmit(sectionName.trim(), defaultValues.id)
      } else {
        onSubmit(sectionName.trim())
      }
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Nombre del espacio"
            className="w-full"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit()
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Agregar Espacio" : "Guardar Cambios"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
