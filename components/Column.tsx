import { Droppable, Draggable } from "@hello-pangea/dnd"
import type { Column as ColumnType } from "../types"
import { AddTaskForm } from "./AddTaskForm"
import { TaskCard } from "./TaskCard"

interface Props {
  column: ColumnType
  index: number
  onAddTask: (columnId: string, title: string) => void
  onRemoveTask: (columnId: string, taskId: string) => void
  onRemoveColumn: (columnId: string) => void
}

export function Column(props: Props) {
  const { column, onAddTask, onRemoveTask, onRemoveColumn } = props

  return (
    <div className="bg-gray-100 p-4 rounded min-w-[300px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <button
          onClick={() => onRemoveColumn(column.id)}
          className="text-red-500 hover:underline text-sm"
        >
          ✕
        </button>
      </div>

      <AddTaskForm onAdd={(data) => onAddTask(column.id, data.title)} />

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[50px] flex flex-col gap-2"
          >
            {column.tasks.map((task, idx) => (
              <Draggable draggableId={task.id} index={idx} key={task.id}>
                {(provided) => (
                  <TaskCard
                    task={task}
                    provided={provided}
                    onRemove={() => onRemoveTask(column.id, task.id)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
