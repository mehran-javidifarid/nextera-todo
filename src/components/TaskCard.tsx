import type { DraggableProvided } from "@hello-pangea/dnd"
import type { Task } from "../types"

interface TaskCardProps {
  task: Task
  provided: DraggableProvided
  onRemove: () => void
}

export function TaskCard(props: TaskCardProps) {
  const { task, provided, onRemove } = props
  
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white border rounded p-2 shadow-sm flex justify-between items-center"
    >
      <span>{task.title}</span>
      <button
        onClick={onRemove}
        className="text-red-500 hover:underline text-sm"
      >
        ✕
      </button>
    </div>
  )
}