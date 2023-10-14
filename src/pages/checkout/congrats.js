import { useState } from "react";
import tw from "twin.macro";
import Script from "next/script";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";

// import CartSummary from "../../components/checkout/cartSummary/index";
import { useOrder } from "@/hooks/useOrder";
import * as api from "../../api/orders";
import OrderSummary from "@/components/orderSummary";
import CheckoutSummary from "@/components/checkoutSummary";
import Layout from "@/components/layout";
import CheckoutLayout from "@/components/checkoutLayout";
import { getHomeInfo } from "@/api/homeInfo";
import { useHomeInfo } from "@/hooks/useHomeInfo";
import { getBusinessFromtHost } from "@/helpers/utils";

const OuterContainer = tw.div`mt-8 flex justify-between flex-1 max-w-screen-xl
sm:flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-col tablet:flex-col tablet:items-center items-center
`;

const Container = tw.div`flex justify-between flex-1 max-w-screen-xl
sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row tablet:flex-col tablet:items-center
w-full
`;

const HalfContainer = tw.div`flex justify-between flex-1`;
const LeftContainer = tw(
  HalfContainer
)`justify-start tablet:self-start flex-col`;
const RightContainer = tw(
  HalfContainer
)`tablet:mt-8 justify-end justify-center tablet:w-full`;

export const getServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;
  const host  = ctx.req.headers.host;
  const business = getBusinessFromtHost(host);

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["order", ctx.query], () =>
    api.getOrderById(orderId)
  );

  await queryClient.fetchQuery(["homeInfo"], () => getHomeInfo(business));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function OrderCongrats() {
  const {
    query: { business, orderId },
    isReady,
  } = useRouter();

  const { data, isFetching } = useOrder(orderId);
  const { data: homeInfo } = useHomeInfo(business);

  const [mercadopago, setMercadopago] = useState(null);

  if (!data) {
    return;
  }

  const PUBLIC_KEY =
    homeInfo?.company?.configurations?.mercadoPagoPublicKey;

  const setUp = () => {
    if (!PUBLIC_KEY) {
      return;
    }

    const mercadopagoAux = new window.MercadoPago(PUBLIC_KEY, {
      locale: "es-UY",
    });
    const settings = {
      initialization: {
        paymentId: data.payment.mercadopagoId,
      },
      callbacks: {
        onReady: () => {
          console.log("ready");
        },
        onError: (error) => {
          console.log("error");
          // TODO:
          // callback llamado para todos los casos de error de Brick
        },
      },
    };
    mercadopagoAux
      .bricks()
      .create("statusScreen", "statusScreenBrick_container", settings)
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
      <OuterContainer>
        {data.payment.mercadopagoId && renderMPScript()}
        {data.payment.mercadopagoId && (
          <div id="statusScreenBrick_container"></div>
        )}
        <Container>
          <LeftContainer>
            <OrderSummary order={data} bankAccount={homeInfo?.company?.configurations?.bankAccount}/>
          </LeftContainer>
          <RightContainer>
            {/* <CartSummary
              products={data.products}
              shippingOption={data.details.shippingOption}
              paymentMethod={data.details.paymentMethod}
            ></CartSummary> */}
            <CheckoutSummary products={data.products} details={data.details} />
          </RightContainer>
        </Container>
      </OuterContainer>
    </>
  );
}

OrderCongrats.getLayout = function getLayout(page) {
  return (
    <Layout>
      <CheckoutLayout step={3}>{page}</CheckoutLayout>
    </Layout>
  );
};
