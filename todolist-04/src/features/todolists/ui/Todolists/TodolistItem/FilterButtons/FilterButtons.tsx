import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { FilterValues, TodolistsType } from "@/features/todolists/ui/Todolists/Todolists";
import { containerSx } from "../TodolistItem.styles";
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-slice";

type Props = {
    todolist: TodolistsType
}

export const FilterButtons = ({ todolist }: Props) => {

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
    }

    return (
        <Box sx={containerSx}>
            <Button color="inherit" variant={todolist.filter === 'all' ? 'outlined' : 'text'} onClick={() => { changeFilter('all', todolist.id) }}>All</Button>
            <Button color="primary" variant={todolist.filter === 'active' ? 'outlined' : 'text'} onClick={() => { changeFilter('active', todolist.id) }}>Active</Button>
            <Button color="secondary" variant={todolist.filter === 'completed' ? 'outlined' : 'text'} onClick={() => { changeFilter('completed', todolist.id) }}>Completed</Button>
        </Box>
    );
};
