import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import Script from "next/script";
import HashLoader from "react-spinners/HashLoader";

// import useMercadopago from "../hooks/useMercadoPago";
import CartSummary from "../components/checkout/cartSummary";
import { useRouter } from "next/router";

const Container = tw.div`flex justify-center px-10 flex-1 mt-4 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row small:flex-col-reverse small:items-center`;
const HalfContaier = tw.div`flex small:w-full flex-1 justify-center`;

export default function MpCheckout() {
  const { push } = useRouter();
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
  const [mercadopago, setMercadopago] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function goToCongrats(paymentId) {
    push(`/congrats/${paymentId}`);
  }

  const product = useMemo(() => {
    return { price: 100 };
  }, []);

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
    transactionAmount: product.price,
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
          goToCongrats(res.data.paymentId);
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
        amount: product.price,
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
        onLoad={(a) => {
          setUp();
        }}
      />
    );
  };

  return (
    <>
      {renderMPScript()}
      <Container>
        {isLoading && (
          <HashLoader
            loading={isLoading}
            size={350}
            color={"#aaa"}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </Container>
      <Container style={isLoading ? { display: "none" } : {}}>
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
};
