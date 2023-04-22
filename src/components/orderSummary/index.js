import tw from "twin.macro";

import { isOrderStatusError } from "@/helpers/utils";

const OrderContainer = tw.div`w-full`;
const Title = tw.h4``;
const ErrorTitle = tw.h4`text-red-700 font-bold`;
const OrderInfo = tw.div`gap-4 flex flex-row flex-wrap text-sm text-gray-700`;
const Row = tw.div`flex flex-col justify-around pr-4 border-l-0 border-y-0 border-r-gray-400 border-dashed`;
const RowTitle = tw.span``;
const RowInfo = tw.span`font-bold`;

const OrderSummaryContainer = tw.div`flex flex-col mt-4 text-gray-900`;
const OrderSummaryRow = tw.div`flex flex-row mt-4`;
const OrderSummaryTitle = tw.span`font-bold mr-2 whitespace-nowrap`;
const OrderSummaryInfo = tw.span`mr-2`;
const OrderSummaryDescription = tw.span`text-gray-500`;

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

const TITLE_SUCCESS = "Gracias! Tu pedido ha sido recibido";
const TITLE_ERROR =
  "Parece que hubo un problema con tu pago. Por favor, ponte en contacto con nosotros ";

const renderTitle = (status) => {
  return isOrderStatusError(status) ? (
    <ErrorTitle>{TITLE_ERROR}</ErrorTitle>
  ) : (
    <Title>{TITLE_SUCCESS}</Title>
  );
};

export default function OrderSummary({ order, bankAccount }) {
  return (
    <OrderContainer>
      {renderTitle(order.status)}
      <OrderInfo>
        <Row>
          <RowTitle>Codigo del pedido</RowTitle>
          <RowInfo>{order.id}</RowInfo>
        </Row>
        <Row>
          <RowTitle>Fecha</RowTitle>
          <RowInfo>{getFormattedDate(order.createdAt)}</RowInfo>
        </Row>
        <Row style={{ border: "none" }}>
          <RowTitle>Total</RowTitle>
          <RowInfo>$ {order.details.totalAmount}</RowInfo>
        </Row>
      </OrderInfo>

      {order.status != "payment_error" && (
        <OrderSummaryContainer>
          <OrderSummaryRow>
            <OrderSummaryTitle>Metodo de pago:</OrderSummaryTitle>
            <OrderSummaryInfo style={{ fontWeight: "bold", marginBottom: 8 }}>
              {order.details.paymentMethod.name}
            </OrderSummaryInfo>
          </OrderSummaryRow>
          <OrderSummaryDescription>
            {order.details.paymentMethod.description}
            {console.log(bankAccount)}
            {order.details.paymentMethod.name.includes("Transferencia") && (
              <div className="mt-2">
                <div className="font-bold text-gray-700">Cuenta:</div>
                <span className="font-bold text-gray-700">{`${bankAccount.bank}: ${bankAccount.number}`}</span>
              </div>
            )}
          </OrderSummaryDescription>
          <OrderSummaryRow style={{ border: "none" }}>
            <OrderSummaryTitle>Metodo de envío:</OrderSummaryTitle>
            <span>
              <OrderSummaryInfo style={{ fontWeight: "bold" }}>
                {`${order.details.shippingOption.name}`}
              </OrderSummaryInfo>
            </span>
          </OrderSummaryRow>
          <OrderSummaryInfo style={{ marginTop: 8 }}>
            {order.details.shippingOption.description}
          </OrderSummaryInfo>
        </OrderSummaryContainer>
      )}
    </OrderContainer>
  );
}
