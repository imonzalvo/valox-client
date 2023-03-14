import { useMemo } from "react";
import tw from "twin.macro";

import Options from "./Options";
import SelectedOption from "./SelectedOption";

const CartSumaryContainer = tw.div`flex flex-col w-2/3 tablet:w-full shadow-md p-4 rounded-md h-fit m-4 small:m-0 bg-gray-100`;
export const Row = tw.div`flex flex-row justify-between items-center`;
const Title = tw.h1`text-xl font-extrabold md:text-xl lg:text-xl xl:text-xl text-gray-900 leading-tight font-sans`;
export const Subtitle = tw.h2`text-base font-semibold font-sans`;
export const Product = tw.h2`mt-2 mb-2 text-base font-light text-gray-700 font-sans`;
const BigDivider = tw.hr`h-px my-6 bg-gray-200 border-0 dark:bg-gray-700 w-full`;

export const ProductQuantity = tw.h2`mt-2 mb-2 text-base font-light text-gray-700 font-sans`;

const calculatePaymentMethodCost = (
  paymentMethod,
  paymentMethods,
  selectedPaymentMethod
) => {
  if (!!paymentMethod) {
    return !!paymentMethod.cost ? paymentMethod.cost : 0;
  }

  const selectedOption = paymentMethods.filter((option) => {
    return option.id == selectedPaymentMethod;
  });

  if (!!selectedOption && !!selectedOption.cost) {
    return selectedOption.cost;
  }
  return 0;
};

const calculateShippingOptionCost = (
  shippingOption,
  shippingOptions,
  selectedShippingOption
) => {
  if (!!shippingOption) {
    return !!shippingOption.cost ? shippingOption.cost : 0;
  }

  const selectedOption = shippingOptions.find((option) => {
    return option.id == selectedShippingOption;
  });

  return !!selectedOption ? selectedOption.cost : 0;
};

const calculateProductsTotalAmount = (products) =>
  products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

export default function CartSummary({
  products,
  shippingOptions,
  selectedShippingOption,
  selectShippingOption,
  // Only used for congrats
  shippingOption,
  paymentMethods,
  selectedPaymentMethod,
  selectPaymentMethod,
  // Only used for congrats
  paymentMethod,
  // Errors
  shippingOptionError,
  paymentMethodError,
}) {
  const paymentMethodCost = useMemo(() => {
    return calculatePaymentMethodCost(
      paymentMethod,
      paymentMethods,
      selectPaymentMethod
    );
  }, [paymentMethod, paymentMethods, selectPaymentMethod]);

  const shippingOptionCost = useMemo(() => {
    return calculateShippingOptionCost(
      shippingOption,
      shippingOptions,
      selectedShippingOption
    );
  }, [shippingOption, shippingOptions, selectedShippingOption]);

  const productsTotalAmount = useMemo(() => {
    return calculateProductsTotalAmount(products);
  }, [products]);

  const totalPurchaseAmount =
    productsTotalAmount + paymentMethodCost + shippingOptionCost;

  return (
    <CartSumaryContainer>
      <Row>
        <Title>Detalles del Pedido</Title>
      </Row>
      <BigDivider />
      <Row>
        <Subtitle>Producto</Subtitle>
        <Subtitle>Total</Subtitle>
      </Row>
      {products.map((product) => (
        <Row key={product.id}>
          <Product>{`${product.title} (1)`}</Product>
          <ProductQuantity>{`$ ${product.price}`}</ProductQuantity>
        </Row>
      ))}
      {/* <BigDivider />
      <Row>
        <Subtitle>Subtotal</Subtitle>
        <Subtitle>{`$ ${totalPurchaseAmount}`}</Subtitle>
      </Row> */}
      <BigDivider />
      {shippingOptions ? (
        <Options
          optionsTitle={"Envío"}
          options={shippingOptions}
          selectedOption={selectedShippingOption}
          selectOption={selectShippingOption}
          error={shippingOptionError ? "Elegir opción de envío" : false}
        />
      ) : (
        <SelectedOption title={"Envío"} option={shippingOption} />
      )}
      <BigDivider />
      {!!paymentMethods ? (
        <Options
          optionsTitle={"Forma de Pago"}
          options={paymentMethods}
          selectedOption={selectedPaymentMethod}
          selectOption={selectPaymentMethod}
          error={paymentMethodError ? "Elegir método de pago" : false}
        />
      ) : (
        <SelectedOption title={"Forma de pago"} option={paymentMethod} />
      )}
      <BigDivider />
      <Row>
        <Subtitle>Total</Subtitle>
        <Subtitle>{`$ ${totalPurchaseAmount}`}</Subtitle>
      </Row>
    </CartSumaryContainer>
  );
}
