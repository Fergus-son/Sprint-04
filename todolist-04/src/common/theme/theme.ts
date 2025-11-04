import { createTheme } from "@mui/material";
import { ThemeMode } from "@/app/app-slice";


export const getTheme = (themeMode: ThemeMode) => createTheme({
  palette: {
    mode: themeMode,
    primary: {
      main: '#ef6c00',
    },
  },
})