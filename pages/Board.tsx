import { useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { v4 as uuidv4 } from "uuid"
import type { Column, Task } from "../types"
import { AddColumnForm } from "../components/AddColumnForm"
import { Column as ColumnComponent } from "../components/Column"

export function Board() {
  const [columns, setColumns] = useState<Column[]>([])

  const addColumn = ({ title }: { title: string }) => {
    const newColumn: Column = {
      id: uuidv4(),
      title,
      tasks: [],
    }
    setColumns([...columns, newColumn])
  }

  const addTask = (columnId: string, title: string) => {
    const newTask: Task = { id: uuidv4(), title }
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ))
  }

  const removeColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.id !== columnId))
  }

  const removeTask = (columnId: string, taskId: string) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ))
  }

  const onDragEnd = (result: DropResult) => {

    const { source, destination } = result
    if (!destination) return

    const sourceCol = columns.find(c => c.id === source.droppableId)!
    const destCol = columns.find(c => c.id === destination.droppableId)!
    const [movedTask] = sourceCol.tasks.splice(source.index, 1)

    if (sourceCol === destCol) {
      sourceCol.tasks.splice(destination.index, 0, movedTask)
      setColumns(columns.map(col => col.id === sourceCol.id ? sourceCol : col))
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask)
      setColumns(columns.map(col => {
        if (col.id === sourceCol.id) return sourceCol
        if (col.id === destCol.id) return destCol
        return col
      }))
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">NEXTERA Board</h1>
      <AddColumnForm onAdd={addColumn} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns.map((column, index) => (
            <ColumnComponent
              key={column.id}
              index={index}
              column={column}
              onAddTask={addTask}
              onRemoveTask={removeTask}
              onRemoveColumn={removeColumn}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}