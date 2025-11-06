import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { TodolistsType } from "../../Todolists";
import DeleteIcon from '@mui/icons-material/Delete'
import { changeTodolistTitleTC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice";


type Props = {
    todolist: TodolistsType
}

export const TodolistTitle = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({ id: todolist.id, title }))
    }

    const deleteTodoList = (todoListId: string) => {
        dispatch(deleteTodolistAC({ id: todoListId }))
    }

    return (
        <div className="container">
            <h3>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={() => { deleteTodoList(todolist.id) }} ><DeleteIcon /></IconButton>
        </div>

    );
};
