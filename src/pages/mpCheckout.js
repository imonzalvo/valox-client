import { useEffect, useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import Script from "next/script";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import * as api from "../api/orders";
import { useOrder } from "@/hooks/useOrder";
import Loader from "@/components/common/Loader";
import CartSummary from "../components/checkout/cartSummary";

const Container = tw.div`flex justify-center px-10 flex-1 mt-4 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row small:flex-col-reverse small:items-center`;
const HalfContaier = tw.div`flex small:w-full flex-1 justify-center`;

export const getServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["order", ctx.query], () =>
    api.getOrderById(orderId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function MpCheckout() {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

  const {
    push,
    query: { orderId },
    isReady,
  } = useRouter();

  const { data, isFetching } = useOrder(orderId);

  const [mercadopago, setMercadopago] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isFetching || isLoading) {
    return <Loader isLoading={true} />;
  }

  function goToCongrats(orderId) {
    push(`/congrats?orderId=${orderId}`);
  }

  const buildTransaction = (cardFormData) => ({
    token: cardFormData.token,
    installments: cardFormData.installments,
    issuerId: cardFormData.issuer_id,
    paymentMethodId: cardFormData.payment_method_id,
    payer: {
      email: cardFormData.payer.email,
      identification: {
        number: cardFormData.payer.identification.number,
        type: cardFormData.payer.identification.type,
      },
    },
    installments: 6,
    transactionAmount: data.details.totalAmount,
    orderId: orderId
  });

  const onFormSubmit = (cardFormData) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/process_payment/${process.env.NEXT_PUBLIC_BUSINESS_HANDLE}`,
          buildTransaction(cardFormData)
        )
        .then((res) => {
          resolve();
          goToCongrats(res.data.id);
        })
        .catch((e) => {
          console.log("error", e);
          reject();
        });
    });

  const setUp = () => {
    const mercadopagoAux = new window.MercadoPago(PUBLIC_KEY, {
      locale: "es-UY",
    });
    const settings = {
      locale: "es-UY",
      initialization: {
        amount: data && data.details.totalAmount,
      },
      callbacks: {
        onReady: () => {
          setIsLoading(false);
        },
        onSubmit: onFormSubmit,
        onError: (error) => {
          // TODO: meter logica de que si hay un error con la carga del form mostrar un msj de error o algo
          console.log("MPForm -> error", error);
        },
      },
      customization: {
        paymentMethods: {
          minInstallments: 1,
          maxInstallments: 12,
        },
      },
    };
    mercadopagoAux
      .bricks()
      .create("cardPayment", "cardPaymentBrick_container", settings)
      .then((res) => {
        console.log("MPForm -> res", res);
      });

    setMercadopago(mercadopagoAux);
    setIsLoading(false)
  };

  const renderMPScript = () => {
    return (
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onReady={(a) => {
          setUp();
        }}
      />
    );
  };

  return (
    <>
      {renderMPScript()}
      <Container>
        <HalfContaier
          id="cardPaymentBrick_container"
          style={{ fontFamily: "sans-serif" }}
        ></HalfContaier>
        <HalfContaier>
          {/* <CartSummary product={product}></CartSummary> */}
        </HalfContaier>
      </Container>
    </>
  );
}
