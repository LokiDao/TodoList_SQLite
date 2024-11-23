import { Todo } from "@app/features/main/models";

type RootStackParams = {
  main: undefined;
  addTodo: { todo?: Todo; isEditMode?: boolean };
};

export type { RootStackParams };
