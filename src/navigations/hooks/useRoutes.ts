import AddTaskScreen from "@app/features/main/screens/AddEditTaskScreen";
import MainScreen from "@app/features/main/screens/MainScreen";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "main",
      component: MainScreen,
    },
    {
      name: "addTodo",
      component: AddTaskScreen,
    },
  ];

  return routes;
};

export default useRoutes;
