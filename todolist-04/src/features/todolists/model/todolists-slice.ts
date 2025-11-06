import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { FilterValues } from "../ui/Todolists/Todolists";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: create => ({
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        // changeTodolistTitleAC: create.reducer<{ id: string, title: string }>((state, action) => {
        //     const index = state.findIndex(todolist => todolist.id === action.payload.id)
        //     if (index !== -1) {
        //         state[index].title = action.payload.title
        //     }
        // }),
        changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        createTodolistAC: create.preparedReducer(
            (title: string) => ({ payload: { title, id: nanoid() } }),
            (state, action) => {
                state.push({ ...action.payload, filter: 'all', addedDate: '', order: 0 })
            })
    }),
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => {
                return { ...tl, filter: 'all' }
            })
        })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
            .addCase(fetchTodolistsTC.rejected, (state, action) => {
            })
            .addCase(changeTodolistTitleTC.rejected, (state, action) => {
            })
    }
})

export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, thunkApi) => {
        try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload: { id: string, title: string }, thunkApi) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)
// export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } = todolistsSlice.actions
export const { deleteTodolistAC, changeTodolistFilterAC, createTodolistAC } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
    filter: FilterValues
}




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




