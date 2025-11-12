import { Grid, Paper } from "@mui/material";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { fetchTodolistsTC, selectTodolists } from "../../model/todolists-slice";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [key: string]: Task[]
}


export type FilterValues = 'all' | 'active' | 'completed'


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <TodolistItem todolist={todolist} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};
