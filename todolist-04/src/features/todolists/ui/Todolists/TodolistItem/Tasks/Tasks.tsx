import { List } from "@mui/material";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { TodolistsType } from "../../Todolists";
import { TaskItem } from "./TaskItem/TaskItem";
import { selectTasks } from "@/features/todolists/model/tasks-selectors";


type Props = {
    todolist: TodolistsType
}

export const Tasks = ({ todolist }: Props) => {

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]
    let filteredTasks = todolistTasks
    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} todolistId={todolist.id} />
                    ))}
                </List>
            )}
        </>
    );
};
