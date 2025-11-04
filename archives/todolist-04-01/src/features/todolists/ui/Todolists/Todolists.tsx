import { useAppSelector } from "@/common/hooks"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { todolistsApi } from "../../api/todolistsApi"
import { useEffect } from "react"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    // 1
    todolistsApi.getTodolists().then((res) => {

    })

    return () => {

    };
  }, []);


  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
