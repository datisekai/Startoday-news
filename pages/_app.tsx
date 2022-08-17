import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import ThemeLayout from "../src/layouts/ThemeLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-confirm-alert/src/react-confirm-alert.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <ThemeLayout>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
              <Toaster />
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ThemeLayout>
    </>
  );
}

export default MyApp;
