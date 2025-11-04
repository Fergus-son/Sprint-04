import { createSlice, nanoid } from "@reduxjs/toolkit";
import { FilterValues, TodolistsType } from "../ui/Todolists/Todolists";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistsType[],
    reducers: create => ({
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        changeTodolistTitleAC: create.reducer<{ id: string, title: string }>((state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        createTodolistAC: create.preparedReducer(
            (title: string) => ({ payload: { title, id: nanoid() } }),
            (state, action) => {
                state.push({ ...action.payload, filter: 'all' })
            }
        )
    }),
})

export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer




// import { FilterValues, TodolistsType } from "@/features/todolists/ui/Todolists/Todolists";
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

// const initialState: TodolistsType[] = []

// export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist') 

// export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
//     return {payload: {title, id: nanoid()}}
// })

// export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')

// export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')


// export const todolistsReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(deleteTodolistAC, (state, action) => {
//         const index = state.findIndex(todo => todo.id === action.payload.id)
//         if (index !== -1) state.splice(index, 1)
//     })
//     .addCase(createTodolistAC, (state, action) => {
//         const newTodolist: TodolistsType = { id: action.payload.id, title: action.payload.title, filter: 'all' }
//         state.push(newTodolist)
//     })
//     .addCase(changeTodolistTitleAC, (state, action) => {
//         const index = state.findIndex(todo => todo.id === action.payload.id)
//         if (index !== -1) state[index].title = action.payload.title
//     })
//     .addCase(changeTodolistFilterAC, (state, action) => {
//         const index = state.findIndex(todo => todo.id === action.payload.id)
//         if (index !== -1) state[index].filter = action.payload.filter
//     })
//     .addDefaultCase

// })




