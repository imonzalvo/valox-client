import { useState, useRef, useMemo } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { QueryClient, useMutation, dehydrate } from "@tanstack/react-query";

import * as api from "../../api/orders";
import { useCheckoutInfo } from "@/hooks/useCheckoutInfo";

import CartSummary from "../../components/checkout/cartSummary/index";
import UserDataForm from "../../components/checkout/UserDataForm";
import Loader from "@/components/common/Loader";
import Layout from "@/components/layout";
import CheckoutLayout from "@/components/checkoutLayout";
import { calculateMethodPrice } from "@/helpers/utils";
import { getCongratsUrl, getPaymentsUrl } from "@/helpers/routedHelper";
import { getHomeInfo } from "@/api/homeInfo";

const Container = tw.div`flex mt-4 justify-between flex-1 font-sans max-w-screen-xl px-2
sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row tablet:flex-col tablet:items-center
tablet:mb-12
`;

const HalfContainer = tw.div`flex justify-between flex-1 tablet:w-full`;
const LeftContainer = tw(HalfContainer)`justify-start tablet:self-start`;
const RightContainer = tw(
  HalfContainer
)`tablet:mt-8 justify-end justify-center tablet:w-full`;

const FormTitle = tw.h1`font-bold`;

export const getServerSideProps = async (ctx) => {
  const { business } = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["homeInfo"], () => getHomeInfo(business));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function OrderInfo() {
  const {
    query: { rawProducts, business },
    push,
  } = useRouter();

  const orderProducts = useMemo(
    () => (rawProducts ? JSON.parse(rawProducts) : []),
    [rawProducts]
  );

  // TODO: Enable cart
  const product = useMemo(
    () => (orderProducts.length ? orderProducts[0].id : undefined),
    [orderProducts]
  );

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: checkoutInfo, isFetching: isFetchingCheckoutInfo } =
    useCheckoutInfo(business, product);

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
        businessHandle: business,
      });
    } else {
      scrollToBottom();
    }
  };

  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const productsAmount = useMemo(() => {
    if (!checkoutInfo) return 0;
    return checkoutInfo.products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }, [checkoutInfo]);

  const shippingOptions = useMemo(() => {
    if (!checkoutInfo) {
      return [];
    }

    return checkoutInfo.shippingOptions.map((shippingOption) => {
      return {
        id: shippingOption.id,
        name: shippingOption.shippingOption.name,
        description: shippingOption.shippingOption.description,
        cost: calculateMethodPrice(shippingOption, productsAmount),
      };
    });
  }, [checkoutInfo, productsAmount]);

  const paymentMethods = useMemo(() => {
    if (!checkoutInfo) {
      return [];
    }

    return checkoutInfo.paymentMethods.map((paymentMethod) => {
      return {
        id: paymentMethod.id,
        name: paymentMethod.paymentMethod.name,
        description: paymentMethod.paymentMethod.description,
        cost: calculateMethodPrice(paymentMethod, productsAmount),
      };
    });
  }, [checkoutInfo, productsAmount]);

  const getSelectedPaymentMethod = () => {
    return checkoutInfo.paymentMethods.find((shippingOption) => {
      return shippingOption.id == selectedPaymentMethod;
    });
  };

  function goToCongrats(orderId) {
    const paymentMethod = getSelectedPaymentMethod();
    if (paymentMethod.paymentMethod.mercadopago) {
      push(getPaymentsUrl(business, orderId));
    } else {
      push(getCongratsUrl(business, orderId));
    }
  }

  if (isFetchingCheckoutInfo || isCreatingOrder) {
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

OrderInfo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <CheckoutLayout step={1}>{page}</CheckoutLayout>
    </Layout>
  );
};
