import { beforeEach, expect, test } from 'vitest'
import { TodolistsType } from '@/features/todolists/ui/Todolists/Todolists'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from '../todolists-slice'
import { nanoid } from '@reduxjs/toolkit'

let todolistId1: string
let todolistId2: string
let startState: TodolistsType[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
})

test("correct todolist should be deleted", () => {
  // 2. Действие
  const endState = todolistsReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  // 3. Проверка, что действие измененило state соответствующим образом в массиве останется один тудулист
  expect(endState.length).toBe(1)

  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct rodolist should be created', () => {
  const title = 'New Todolist'
  const endState = todolistsReducer(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test('correct todolist should change this title', () => {
  const title = 'New Title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct todolist should be filtered correctly', () => {
  const filter = 'completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
