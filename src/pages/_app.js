import { useState } from "react";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import tw from "twin.macro";
import { config } from "../lib/react-query-config";
import GlobalStyles from "./../styles/GlobalStyles";
import Header from "@/components/header/Header";
const GlobalContainer = tw.div`flex flex-1 justify-center md:w-full 
                                sm:w-full lg:w-full px-8 bg-white`;

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyles />
        <Header />
        <GlobalContainer>
          <Component {...pageProps} />
        </GlobalContainer>
      </Hydrate>
    </QueryClientProvider>
  );
}
