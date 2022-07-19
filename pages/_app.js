import "../styles/globals.css";
import "@fontsource/noto-sans";
import { QueryClientProvider } from "react-query";
import queryClient from "../helpers/queryClient";
import PageLayout from "../layout/PageLayout";
import { SnackbarProvider } from "notistack";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { theme } from "../helpers/muiTheme";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import createEmotionCache from "../utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <PageLayout>
                <CssBaseline />
                <Component {...pageProps} />
              </PageLayout>
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
