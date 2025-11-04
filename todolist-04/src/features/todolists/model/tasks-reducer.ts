import { TasksState } from "@/features/todolists/ui/Todolists/Todolists";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { createTodolistAC, deleteTodolistAC } from "./todolists-slice";

const initialState: TasksState = {}

export const createTaskAC = createAction('tasks/createTask', (todolistId: string, title: string) => {
    return { payload: { todolistId, title } }
})

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const TaskToUpdate = tasks.find(task => task.id === action.payload.taskId)
            if (TaskToUpdate) TaskToUpdate.isDone = true
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const TaskToUpdate = tasks.find(task => task.id === action.payload.taskId)
            if (TaskToUpdate) TaskToUpdate.title = action.payload.title
        })
})

