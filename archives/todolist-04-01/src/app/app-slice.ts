import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { selectThemeMode } from "./app-selectors"

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "light" as ThemeMode,
  },
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      })
    }
  },
  selectors: {
    selectThemeMode: (state) => { state.themeMode }
  }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC } = appSlice.actions

// const initialState = {
//   themeMode: "light" as ThemeMode,
// }

// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })

export type ThemeMode = "dark" | "light"
