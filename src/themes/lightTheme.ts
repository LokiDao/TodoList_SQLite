import { extendTheme, theme as nbTheme } from "native-base";

const lightThemeColors = {
  ...nbTheme.colors,
  skeleton: {
    startColor: "gray.300",
    endColor: "gray.400",
  },
  text: "#000000",
  titlePage: "#5EDFF5",
  background: "#F7F8FC",
  backgroundIcon: "#DDE0FF",
  button: {
    active: "#4284F4",
    inactive: "#9E9E9E",
  },
  backgroundCourseCard: "#FFFFFF",
  backgroundExpandColor: {
    text: "#16AEF4",
    bg: "#DDE0FF",
  },
  icon: {
    finishActive: "#4284F4",
  },
  switchButton: {
    active: "#335EF7",
  },
  card: {
    background: "white",
  },
  loading: {
    color: "#5EDFF5",
  },
};

const fontConfig = {
  ios: {
    100: {
      normal: "San Francisco",
    },
    200: {
      normal: "San Francisco",
    },
    300: {
      normal: "San Francisco",
    },
    400: {
      normal: "San Francisco",
    },
    500: {
      normal: "San Francisco",
    },
    600: {
      normal: "San Francisco",
    },
    700: {
      normal: "San Francisco",
    },
    800: {
      normal: "San Francisco",
    },
    900: {
      normal: "San Francisco",
    },
  },
  default: {
    100: {
      normal: "San Francisco",
    },
    200: {
      normal: "San Francisco",
    },
    300: {
      normal: "San Francisco",
    },
    400: {
      normal: "San Francisco",
    },
    500: {
      normal: "San Francisco",
    },
    600: {
      normal: "San Francisco",
    },
    700: {
      normal: "San Francisco",
    },
    800: {
      normal: "San Francisco",
    },
    900: {
      normal: "San Francisco",
    },
  },
};

const fonts = {
  heading: "San Francisco",
  body: "San Francisco",
  mono: "San Francisco",
};

const lightTheme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "light",
  },
  colors: lightThemeColors,
  fontConfig,
  fonts,
});

export type LightThemeType = typeof lightTheme;

export default lightTheme;
