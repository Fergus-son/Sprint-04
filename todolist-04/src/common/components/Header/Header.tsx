import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getTheme } from "../../theme/theme";
import MenuIcon from '@mui/icons-material/Menu'
import { changeThemeModeAC, selectThemeMode } from "@/app/app-slice";
import { AppBar, Container, IconButton, Switch, Toolbar } from "@mui/material";
import { containerSx } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.styles";
import { NavButton } from "@/common/components/NavButton/NavButton";

export const Header = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()


    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
    }



    return (

        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth='lg' sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode} />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
