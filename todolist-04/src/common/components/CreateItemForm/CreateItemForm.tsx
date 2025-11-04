import { type ChangeEvent, type KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            onCreateItem(trimmedTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                label={"Enter a title"}
                variant={"outlined"}
                value={title}
                size={"small"}
                error={!!error}
                helperText={error}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <IconButton onClick={createItemHandler} color={"primary"}>
                <AddBoxIcon />
            </IconButton>
        </div>
    )
}



// import { ChangeEvent, KeyboardEvent, useState } from "react";
// // import { Button } from "./Button";
// import { IconButton, TextField } from "@mui/material";
// import AddBoxIcon from '@mui/icons-material/AddBox'

// type ItemFormType = {
//     createItem: (title: string) => void
// }

// export const CreateItemForm = ({ createItem }: ItemFormType) => {

//     const [itemTitle, setItemTitle] = useState('')
//     const [error, setError] = useState<string | null>(null)

//     const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         setItemTitle(event.currentTarget.value)
//         setError(null)
//     }

//     const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             createItemHandler()
//         }
//     }

//     const createItemHandler = () => {
//         const trimmedTitle = itemTitle.trim()
//         if (trimmedTitle.trim() !== '') {
//             createItem(trimmedTitle);
//             setItemTitle('')
//         } else {
//             setError('Title is required')
//         }
//     }

//     return (
//         <div>
//             <TextField label='Enter a title' variant="outlined" size="small" error={!!error} helperText={error}
//                 value={itemTitle} onChange={changeItemTitleHandler} onKeyDown={createTaskOnEnterHandler} />
//             <IconButton onClick={() => { createItemHandler() }} color="primary"> <AddBoxIcon /> </IconButton>
//         </div>
//     );
// };
