import { extendTheme, theme as nbTheme } from "native-base";

const darkThemeColors = {
  ...nbTheme.colors, // Include default colors

  text: "#ffffff",
  titlePage: "#85E9FA",
  background: "#000000",
  backgroundIcon: "#DDE0FF",
  button: {
    active: "#4284F4",
    inactive: "#9E9E9E",
  },
  skeleton: {
    startColor: "gray.600",
    endColor: "gray.700",
  },
  backgroundCourseCard: "#1F222A",
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
    background: "#1F222A",
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

const darkTheme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
  colors: darkThemeColors,
  fontConfig,
  fonts,
});

export type DarkThemeType = typeof darkTheme;

export default darkTheme;
