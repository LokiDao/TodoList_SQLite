import { Todo } from "../../models";

// Define the shape of the Home slice state
interface MainState {
  isLoadingGetTodo: boolean;
  todos: Todo[];
  selectedTodo: Todo | null;
  error: string | undefined;
}

// Initialize the state
export const initialMainState: MainState = {
  isLoadingGetTodo: false,
  selectedTodo: null,
  todos: [],
  error: undefined,
};
