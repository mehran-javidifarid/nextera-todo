import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const columnSchema = z.object({
  title: z.string().min(1),
})

type ColumnForm = z.infer<typeof columnSchema>

interface Props {
  onAdd: (data: ColumnForm) => void
}

export function AddColumnForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnForm>({
    resolver: zodResolver(columnSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const onSubmit = (data: ColumnForm) => {
    onAdd(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 flex gap-2"
    >
      <input
        {...register("title")}
        className="border p-2 rounded w-64"
        placeholder="New column title"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Column
      </button>
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </form>
  )
}