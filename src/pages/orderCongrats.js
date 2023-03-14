import tw from "twin.macro";
import { useRouter } from "next/router";
import HashLoader from "react-spinners/HashLoader";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import CartSummary from "../components/checkout/cartSummary/index";
import { useOrder } from "@/hooks/useOrder";
import * as api from "../api/orders";
import Loader from "@/components/common/Loader";

const Container = tw.div`mt-12 flex justify-between flex-1 max-w-screen-xl px-2
sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row tablet:flex-col tablet:items-center
tablet:mb-20
`;
const HalfContainer = tw.div`flex justify-between flex-1`;
const LeftContainer = tw(HalfContainer)`justify-start tablet:self-start`;
const RightContainer = tw(
  HalfContainer
)`tablet:mt-8 justify-end justify-center tablet:w-full`;

const OrderContainer = tw.div`w-full`;
const Title = tw.h4``;
const OrderInfo = tw.div`gap-4 flex flex-row flex-wrap text-sm text-gray-700`;
const Row = tw.div`flex flex-col justify-around pr-4 border-l-0 border-y-0 border-r-gray-400 border-dashed`;
const RowTitle = tw.span``;
const RowInfo = tw.span`font-bold`;

const OrderSummary = tw.div`flex flex-col mt-8 text-gray-700`;
const OrderSummaryRow = tw.div`flex flex-row mt-4`;
const OrderSummaryTitle = tw.span`font-bold mr-2 whitespace-nowrap`;
const OrderSummaryInfo = tw.span`mr-2`;

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

export default function OrderCongrats() {
  const {
    query: { orderId },
    isReady,
  } = useRouter();

  const { data, isFetching } = useOrder(orderId);

  if (!isReady || isFetching) {
    return <Loader isLoading={!isReady || isFetching} />;
  }

  const getFormattedDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getDate()} / ${getFullDateMonth(
      date
    )} / ${date.getFullYear()}`;
  };

  const getFullDateMonth = (date) => {
    let rawMonth = date.getMonth();
    let realMonth = rawMonth + 1;

    return realMonth < 10 ? `0${realMonth}` : realMonth;
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <OrderContainer>
            <Title>Gracias! Tu pedido ha sido recibido</Title>
            <OrderInfo>
              <Row>
                <RowTitle>Codigo del pedido</RowTitle>
                <RowInfo>{orderId}</RowInfo>
              </Row>
              <Row>
                <RowTitle>Fecha</RowTitle>
                <RowInfo>{getFormattedDate(data.createdAt)}</RowInfo>
              </Row>
              <Row style={{ border: "none" }}>
                <RowTitle>Total</RowTitle>
                <RowInfo>$ {data.details.totalAmount}</RowInfo>
              </Row>
            </OrderInfo>

            <OrderSummary>
              <OrderSummaryRow>
                <OrderSummaryTitle>Metodo de pago:</OrderSummaryTitle>
                <OrderSummaryInfo>
                  {data.details.paymentMethod.name}
                </OrderSummaryInfo>
              </OrderSummaryRow>
              <OrderSummaryRow style={{ border: "none" }}>
                <OrderSummaryTitle>Metodo de envío:</OrderSummaryTitle>
                <span>
                  <OrderSummaryInfo style={{ fontWeight: "bold" }}>
                    {`${data.details.shippingOption.name} - `}
                  </OrderSummaryInfo>
                  <OrderSummaryInfo>
                    {data.details.shippingOption.description}
                  </OrderSummaryInfo>
                </span>
              </OrderSummaryRow>
            </OrderSummary>
          </OrderContainer>
        </LeftContainer>
        <RightContainer>
          <CartSummary
            products={data.products}
            shippingOption={data.details.shippingOption}
            paymentMethod={data.details.paymentMethod}
          ></CartSummary>
        </RightContainer>
      </Container>
    </>
  );
}
