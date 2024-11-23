import darkTheme, { DarkThemeType } from "./darkTheme";
import lightTheme, { LightThemeType } from "./lightTheme";

export type ThemeType = DarkThemeType & LightThemeType;

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export { config, darkTheme, lightTheme };
export type { DarkThemeType, LightThemeType };
