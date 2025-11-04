import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolistAC } from "@/features/todolists/model/todolists-slice";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import { Container, Grid } from "@mui/material";


export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container maxWidth='lg'>

            <Grid sx={{ mb: '30px' }}>
                <CreateItemForm onCreateItem={createTodolist} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    );
};
