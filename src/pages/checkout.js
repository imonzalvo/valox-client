import { useState, useRef, useMemo } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import * as api from "../api/orders";
import { useCheckoutInfo } from "@/hooks/useCheckoutInfo";

import CartSummary from "../components/checkout/cartSummary/index";
import UserDataForm from "../components/checkout/UserDataForm";
import Loader from "@/components/common/Loader";

const Container = tw.div`flex mt-12 justify-between flex-1 font-sans max-w-screen-xl px-2
sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row tablet:flex-col tablet:items-center
tablet:mb-12
`;

const HalfContainer = tw.div`flex justify-between flex-1 tablet:w-full`;
const LeftContainer = tw(HalfContainer)`justify-start tablet:self-start`;
const RightContainer = tw(
  HalfContainer
)`tablet:mt-8 justify-end justify-center tablet:w-full`;

const FormTitle = tw.h1`font-bold`;

export default function Checkout() {
  const {
    query: { product },
    push,
  } = useRouter();

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: checkoutInfo, isFetching: isFetchingCheckoutInfo } =
    useCheckoutInfo(product);

  const { mutate, isLoading: isCreatingOrder } = useMutation(api.createOrder, {
    onSuccess: (data) => {
      goToCongrats(data.id);
    },
  });

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
      mutate({
        ...data,
        shippingOption: selectedShippingOption,
        paymentMethod: selectedPaymentMethod,
        products: checkoutInfo.products,
      });
    } else {
      scrollToBottom();
    }
  };

  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const shippingOptions = useMemo(() => {
    if (!checkoutInfo) {
      return [];
    }

    return checkoutInfo.shippingOptions.map((shippingOption) => {
      return {
        id: shippingOption.id,
        name: shippingOption.shippingOption.name,
        description: shippingOption.shippingOption.description,
        // TODO: Cost * products
        cost: shippingOption.cost,
      };
    });
  }, [checkoutInfo]);

  const paymentMethods = useMemo(() => {
    if (!checkoutInfo) {
      return [];
    }

    return checkoutInfo.paymentMethods.map((paymentMethod) => {
      return {
        id: paymentMethod.id,
        name: paymentMethod.paymentMethod.name,
        description: paymentMethod.paymentMethod.description,
        // TODO: Cost * products
        price: paymentMethod.cost,
      };
    });
  }, [checkoutInfo]);

  const getSelectedPaymentMethod = () => {
    return checkoutInfo.paymentMethods.find((shippingOption) => {
      return shippingOption.id == selectedPaymentMethod;
    });
  };

  function goToCongrats(orderId) {
    const paymentMethod = getSelectedPaymentMethod();
    if (paymentMethod.paymentMethod.mercadopago) {
      push(`/mpCheckout?orderId=${orderId}`);
    } else {
      push(`/congrats?orderId=${orderId}`);
    }
  }

  if (isCreatingOrder) {
    return <Loader isLoading={true} />;
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
      <RightContainer>
        {checkoutInfo && checkoutInfo.products && (
          <CartSummary
            products={checkoutInfo.products}
            shippingOptions={shippingOptions}
            selectedShippingOption={selectedShippingOption}
            selectShippingOption={setSelectedShippingOption}
            paymentMethods={paymentMethods}
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
}
