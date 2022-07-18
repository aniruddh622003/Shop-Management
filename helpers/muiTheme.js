import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#191726",
    },
    secondary: {
      main: "#2979ff",
    },
    background: {
      default: "#191726",
      paper: "#2e2c3b",
    },
  },
  typography: {
    fontFamily: "Noto Sans,sans-serif",
  },
});
