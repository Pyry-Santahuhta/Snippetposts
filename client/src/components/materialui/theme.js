import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#E0E0E2",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#0B6E4F",
    },
    secondary: {
      main: "#0B6E4F",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#E0E0E2",
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
