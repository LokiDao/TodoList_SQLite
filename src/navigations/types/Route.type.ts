import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { RootStackParams } from "./RootStackParams.type";

type Route = {
  name: keyof RootStackParams;
  component: React.ComponentType<{}>;
  options?: StackNavigationOptions;
};

// type DrawerRoute<ParamList> = {
//   name: keyof ParamList;
//   component: React.ComponentType<any>;
//   options?: DrawerNavigationOptions;
// };

// type BottomTabRoute<ParamList> = {
//   name: keyof ParamList;
//   component: React.ComponentType<any>;
//   options?: BottomTabNavigationOptions;
// };

export type { Route };
