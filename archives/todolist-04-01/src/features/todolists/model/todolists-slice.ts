import { createAction, createReducer, createSlice, current, nanoid } from "@reduxjs/toolkit"


export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      fetchTodolist: create.reducer<{ todolist: Todolist2[] }>((state, action) => {
        return action.payload.todolist.map(tl => ({ ...tl, filter: 'all' }))
      }),

      deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      createTodolistAC: create.preparedReducer(
        (title: string) => {
          // let a = current(state)
          const newTodolist: Todolist = {
            title,
            filter: 'all',
            id: nanoid()
          }
          return { payload: newTodolist }
        },
        (state, action) => {
          // state.push(action.payload)
        }),
      changeTodolistTitleAC: create.reducer<{ id: string, title: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),

      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      })
    }
  }
})


export const todolistsReducer = todolistsSlice.reducer
export const { deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } = todolistsSlice.actions




// export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
//   "todolists/changeTodolistFilter",
// )

// const initialState: Todolist[] = []

// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder
// .addCase(deleteTodolistAC, (state, action) => {
//   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//   if (index !== -1) {
//     state.splice(index, 1)
//   }
// })
// .addCase(createTodolistAC, (state, action) => {
//   state.push({ ...action.payload, filter: "all" })
// })
//     .addCase(changeTodolistTitleAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state[index].title = action.payload.title
//       }
//     })
//     .addCase(changeTodolistFilterAC, (state, action) => {
//       const todolist = state.find((todolist) => todolist.id === action.payload.id)
//       if (todolist) {
//         todolist.filter = action.payload.filter
//       }
//     })
// })

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"



export type DomainTodolist = Todolist2 & { filter: FilterValues }

export type Todolist2 = {
  id: string
  title: string
  addedDate: string
  order: string
}

