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

const GlobalContainer = tw.div`flex flex-1 justify-center md:w-full 
                                sm:w-full lg:w-full px-8 tablet:px-4 bg-white`;

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

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          <Layout>
            <GlobalContainer>
              {!pageLoading ? (
                <Component {...pageProps} />
              ) : (
                <Loader isLoading={true} />
              )}
            </GlobalContainer>
          </Layout>
          {!!whatsAppNumber && (
            <div style={{ position: "absolute" }}>
              <FloatingWhatsApp
                phoneNumber={whatsAppNumber}
                statusMessage={"Disponible"}
                accountName={process.env.REACT_APP_BUSINESS_TITLE}
                chatMessage={"Buenas! En que podemos ayudarte?"}
                placeholder={"Escriba su consulta"}
                avatar="favicon.ico"
              />
            </div>
          )}
        </Hydrate>
      </QueryClientProvider>
    </CartProvider>
  );
}
