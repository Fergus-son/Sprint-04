import { TodolistsType } from "@/features/todolists/ui/Todolists/Todolists"
import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { createTaskAC } from "@/features/todolists/model/tasks-slice"


type TodolistItemType = {
  todolist: TodolistsType
}

export const TodolistItem = ({ todolist }: TodolistItemType) => {

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    const action = createTaskAC({ todolistId: todolist.id, title })
    dispatch(action)
  }
  return (

    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )

}
