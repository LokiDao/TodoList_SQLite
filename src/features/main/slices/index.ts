import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models";
import { initialMainState } from "./types";

const mainScreenSlice = createSlice({
  name: "main",
  initialState: initialMainState,
  reducers: {
    resetMainState: () => initialMainState,

    addTodo: (
      state,
      action: PayloadAction<{
        title: string;
        description?: string;
        dueDate: Date;
      }>,
    ) => {
      const newTodo: Todo = {
        id: Math.random().toString(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        completed: false,
      };
      state.todos.push(newTodo);
    },

    // Edit an existing todo
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        dueDate: Date;
      }>,
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index].title = action.payload.title;
        state.todos[index].description = action.payload.description;
        state.todos[index].dueDate = action.payload.dueDate;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    selectTodo: (state, action: PayloadAction<string | null>) => {
      state.selectedTodo =
        state.todos.find((todo) => todo.id === action.payload) || null;
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  resetMainState,
  addTodo,
  editTodo,
  deleteTodo,
  selectTodo,
  toggleComplete,
  setTodos,
} = mainScreenSlice.actions;

export default mainScreenSlice.reducer;
