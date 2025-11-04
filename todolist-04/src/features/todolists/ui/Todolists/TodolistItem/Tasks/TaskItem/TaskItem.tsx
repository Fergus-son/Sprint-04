import { Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan";
import { getListItemSx } from "../../TodolistItem.styles";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import { ChangeEvent } from "react";
import { Task } from "../../../Todolists";
import DeleteIcon from '@mui/icons-material/Delete'
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/todolists/model/tasks-reducer";


type Props = {
    todolistId: string
    task: Task
}

export const TaskItem = ({todolistId, task}: Props) => {

    const dispatch = useAppDispatch()


    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ todolistId: todolistId, taskId: task.id, title }))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ todolistId: todolistId, taskId: task.id, isDone: newStatusValue }))
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({ todolistId, taskId }))
    }
    //Оставить в массиве только те задачи, у которых id НЕ равен переданному taskId


    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={() => { deleteTask(todolistId, task.id) }}><DeleteIcon /></IconButton>
        </ListItem>
    );
};
