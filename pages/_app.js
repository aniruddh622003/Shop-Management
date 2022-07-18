import "../styles/globals.css";
import "@fontsource/noto-sans";
import { QueryClientProvider } from "react-query";
import queryClient from "../helpers/queryClient";
import PageLayout from "../layout/PageLayout";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../helpers/muiTheme";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PageLayout>
            <CssBaseline />
            <Component {...pageProps} />
          </PageLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
