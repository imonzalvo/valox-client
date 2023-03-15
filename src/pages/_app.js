import { useState } from "react";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import tw from "twin.macro";
import { FloatingWhatsApp } from "react-floating-whatsapp";

import { config } from "../lib/react-query-config";
import GlobalStyles from "./../styles/GlobalStyles";
import Header from "@/components/header/Header";
const GlobalContainer = tw.div`flex flex-1 justify-center md:w-full 
                                sm:w-full lg:w-full px-8 bg-white`;

const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
  );
}
