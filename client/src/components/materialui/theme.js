import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#B4C9CF",
      background: "#E6EDEF",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#3C3C3B",
    },
    secondary: {
      main: "#3C3C3B",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#B4C9CF",
    },
    select: {
      main: "#3B60E4",
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default theme;
