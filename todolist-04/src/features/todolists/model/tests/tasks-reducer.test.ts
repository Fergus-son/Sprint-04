import { beforeEach, expect, test } from 'vitest'
import type { TasksState } from '@/features/todolists/ui/Todolists/Todolists'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from '../tasks-reducer'
import { createTodolistAC, deleteTodolistAC } from '../todolists-slice'

let startState: TasksState = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, createTodolistAC('New todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, deleteTodolistAC({ id: 'todolistId2' }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('correctly task should be created at correct todolist', () => {
  const todolistId = 'todolistId2'
  const title = 'juice'
  const endState = tasksReducer(startState, createTaskAC(todolistId, title))

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe('juice')
  expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should be deleted from correct todolist', () => {
  const endState = tasksReducer(startState, deleteTaskAC({ todolistId: 'todolistId2', taskId: '3' }))

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(2)
  expect(endState.todolistId2[2]).toBeUndefined()
})

test('change task status in correct task in correct todolist', () => {
  const endState = tasksReducer(startState, changeTaskStatusAC({ todolistId: 'todolistId2', taskId: '3', isDone: true }))

  expect(endState.todolistId1[2].isDone).toBe(false)
  expect(endState.todolistId2[2].isDone).toBe(true)
})

test('change task title in correct task in correct todolist', () => {
  const endState = tasksReducer(startState, changeTaskTitleAC({ todolistId: 'todolistId2', taskId: '3', title: 'coffee' }))

  expect(endState.todolistId2[2].title).toBe('coffee')
  expect(endState.todolistId1[2].title).toBe('React')
})