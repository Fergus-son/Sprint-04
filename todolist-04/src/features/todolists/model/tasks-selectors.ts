import { RootState } from "@/app/store";
import { TasksState } from "@/features/todolists/ui/Todolists/Todolists";

export const selectTasks = (state: RootState): TasksState => state.tasks