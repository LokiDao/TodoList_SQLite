// src/types/todo.ts
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
}

export type { Todo };
