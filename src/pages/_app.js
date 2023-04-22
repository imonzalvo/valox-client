import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import tw from "twin.macro";
import { FloatingWhatsApp } from "react-floating-whatsapp";

import { config } from "../lib/react-query-config";
import { CartProvider } from "../providers/Cart";
import GlobalStyles from "./../styles/GlobalStyles";
import Loader from "@/components/common/Loader";
import Layout from "@/components/layout";

const GlobalContainer = tw.div`flex flex-1 justify-center w-full 
                                bg-white min-h-full overflow-visible`;

// md:w-full
// sm:w-full lg:w-full px-8 tablet:px-4

const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient(config));
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router, setPageLoading]);

  const getLayout = Component.getLayout || ((page) => page);

  const renderComponent = () => (
    <GlobalContainer>
      {!pageLoading ? (
        <Component {...pageProps} />
      ) : (
        <Loader isLoading={true} />
      )}
    </GlobalContainer>
  );

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          {Component.getLayout ? (
            getLayout(renderComponent())
          ) : (
            <Layout>{renderComponent()}</Layout>
          )}
        </Hydrate>
      </QueryClientProvider>
    </CartProvider>
  );
}
