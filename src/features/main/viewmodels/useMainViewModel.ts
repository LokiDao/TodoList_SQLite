import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import {
  createTable,
  deleteTodoSqlite,
  getDBConnection,
  getTodosSqlite,
  updateTodoSqlite,
} from "@app/utils/database";
import { useEffect, useState } from "react";
import { deleteTodo, setTodos, toggleComplete } from "../slices";

const useMainViewModel = () => {
  const { todos } = useAppSelector((state) => state.main);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        fetchTodos();
      } catch (error: any) {
        dispatch(
          showDialog({
            title: "Error",
            content: error.message,
            type: DialogType.ERROR,
            confirmButtonText: "OK",
          }),
        );
      } finally {
        setIsLoading(false);
      }
    };
    initDB();
  }, []);

  // Fetch todos from SQLite
  const fetchTodos = async () => {
    try {
      const db = await getDBConnection();
      const allTodos = await getTodosSqlite(db);
      dispatch(setTodos(allTodos));
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
          confirmButtonText: "OK",
        }),
      );
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        dispatch(toggleComplete(id));
        const updatedTodo = { ...todo, completed: !todo.completed };
        const db = await getDBConnection();
        await updateTodoSqlite(db, updatedTodo);
        fetchTodos();
      }
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
          confirmButtonText: "OK",
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Are you sure you want to delete this task?",
        type: DialogType.ALERT,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        onConfirm: async () => {
          try {
            const db = await getDBConnection();
            await deleteTodoSqlite(db, id);
            dispatch(deleteTodo(id));
            fetchTodos();
            dispatch(hideDialog());
          } catch (error: any) {
            dispatch(
              showDialog({
                title: "Error",
                content: error.message,
                type: DialogType.ERROR,
                confirmButtonText: "OK",
              }),
            );
          }
        },
      }),
    );
  };

  const ongoingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return {
    ongoingTodos,
    completedTodos,
    handleComplete,
    handleDelete,
    isLoading,
  };
};

export default useMainViewModel;
