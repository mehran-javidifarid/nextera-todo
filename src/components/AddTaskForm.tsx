import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const taskSchema = z.object({
  title: z.string().min(1),
})

type TaskForm = z.infer<typeof taskSchema>

interface Props {
  onAdd: (data: TaskForm) => void
}

export function AddTaskForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const onSubmit = (data: TaskForm) => {
    onAdd(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mb-4"
    >
      <input
        {...register("title")}
        className="border p-1 rounded"
        placeholder="Task title"
      />
      <button type="submit" className="bg-green-500 text-white rounded px-2 py-1">
        Add Task
      </button>
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </form>
  )
}