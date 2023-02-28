import { useState, useRef } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";

import HashLoader from "react-spinners/HashLoader";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import * as api from "../api/orders";
import { useCheckoutInfo } from "@/hooks/useCheckoutInfo";

import CartSummary from "../components/checkout/cartSummary/index";
import UserDataForm from "../components/checkout/UserDataForm";

const Container = tw.div`flex justify-between flex-1 font-sans max-w-screen-xl px-2
sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row tablet:flex-col tablet:items-center
tablet:mb-12
`;

const HalfContainer = tw.div`flex justify-between flex-1 tablet:w-full`;
const LeftContainer = tw(HalfContainer)`justify-start tablet:self-start`;
const RightContainer = tw(
  HalfContainer
)`tablet:mt-8 justify-end justify-center tablet:w-full`;

const FormTitle = tw.h1`font-bold`;

export default () => {
  const {
    query: { product },
    push
  } = useRouter();

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    status,
    data: productData,
    isFetching,
    error,
  } = useCheckoutInfo(product);

  const { mutate } = useMutation(api.createOrder, {
    onSuccess: (data) => {
      goToCongrats(data.id);
    },
  });

  console.log("CHO", status, productData);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!selectedShippingOption) {
      setError("root.shippingError", {
        type: "not selected",
      });
    }

    if (!selectedPaymentMethod) {
      setError("root.paymentMethodError", {
        type: "not selected",
      });
    }

    if (!!selectedPaymentMethod && !!selectedShippingOption) {
      console.log("proddddd", productData);
      mutate({
        ...data,
        shippingOption: selectedShippingOption,
        paymentMethod: selectedPaymentMethod,
        products: productData.products,
      });
    } else {
      scrollToBottom();
    }
  };

  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  function goToCongrats(orderId) {
    push(`/orderCongrats?orderId=${orderId}`);
  }

  const renderSpinner = () => (
    <Container>
      <HashLoader
        loading={isFetching}
        size={350}
        color={"#aaa"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>
  );

  if (isFetching) {
    return renderSpinner();
  }
  return (
    <Container>
      <LeftContainer>
        <div style={{ flexDirection: "column", width: "100%" }}>
          <FormTitle>Detalles de Facturación</FormTitle>
          <UserDataForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      </LeftContainer>
      {console.log("error", errors)}
      <RightContainer>
        {productData && productData.products && (
          <CartSummary
            products={productData.products}
            shippingOptions={productData.shippingOptions}
            selectedShippingOption={selectedShippingOption}
            selectShippingOption={setSelectedShippingOption}
            paymentMethods={productData.paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            selectPaymentMethod={setSelectedPaymentMethod}
            shippingOptionError={
              errors && errors.root && errors.root.shippingError
            }
            paymentMethodError={
              errors && errors.root && errors.root.paymentMethodError
            }
          ></CartSummary>
        )}
        <div ref={bottomRef} />
      </RightContainer>
    </Container>
  );
};
