import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { PrimeReactProvider } from "primereact/api";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
