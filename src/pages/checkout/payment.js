import { useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import Script from "next/script";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import * as ordersApi from "../../api/orders";
import { getHomeInfo } from "@/api/homeInfo";

import { useOrder } from "@/hooks/useOrder";
import Loader from "@/components/common/Loader";
import Layout from "@/components/layout";
import CheckoutLayout from "@/components/checkoutLayout";
import { getCongratsUrl } from "@/helpers/routedHelper";
import { useHomeInfo } from "@/hooks/useHomeInfo";

const Container = tw.div`flex justify-center px-2 flex-1 mt-4 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row small:flex-col-reverse small:items-center`;
const HalfContaier = tw.div`flex small:w-full flex-1 justify-center`;

export const getServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;
  const host  = ctx.req.headers.host;
  const business = getBusinessFromtHost(host);
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["order", ctx.query], () =>
  ordersApi.getOrderById(orderId)
  );
  await queryClient.fetchQuery(["homeInfo"], () => getHomeInfo(business));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function MpCheckout() {
  const {
    push,
    query: { business, orderId },
    isReady,
  } = useRouter();

  const { data, isFetching } = useOrder(orderId);

  const [mercadopago, setMercadopago] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: homeInfo } = useHomeInfo(business);

  const MERCADOPAGO_PUBLIC_KEY = homeInfo?.company?.configurations?.mercadoPagoPublicKey;


  if (isFetching || isLoading) {
    return <Loader isLoading={true} />;
  }

  function goToCongrats(orderId) {
    push(getCongratsUrl(business, orderId));
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
    orderId: orderId,
  });

  const onFormSubmit = (cardFormData) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/process_payment/${homeInfo.company.handle}`,
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
    if(!MERCADOPAGO_PUBLIC_KEY) {
      return;
    }
    const mercadopagoAux = new window.MercadoPago(MERCADOPAGO_PUBLIC_KEY, {
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

MpCheckout.getLayout = function getLayout(page) {
  return (
    <Layout>
      <CheckoutLayout step={2}>{page}</CheckoutLayout>
    </Layout>
  );
};
