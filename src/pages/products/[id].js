import { useState, useMemo } from "react";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import Loader from "@/components/common/Loader";

import * as api from "../../api/products";
import { useProduct } from "../../hooks/useProduct";

import QuantityPicker from "../../components/products/QuantityPicker";

const Container = tw.div`mt-12 flex justify-between sm:py-12
md:flex-row
max-w-screen-xl flex flex-1 flex-col my-0  small:mb-12`;

const ImageContainer = styled.div`
  .image-gallery-image {
    display: flex;
    flex: 1;
    height: 500px;
  }
`;
const ImageContainers = tw.div`w-full md:w-1/2 h-120 flex-1`;
const DetailsContainer = tw.div`pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2`;
const Title = tw.h1`font-sans	sm:mt-0 mt-2 text-5xl font-light leading-large`;
const SubTitle = tw.h2`font-sans text-2xl tracking-wide sm:py-8 py-6 font-light`;
const Description = tw.p`font-sans text-gray-600 leading-7`;
const QuantityPickerContainer = tw.div`my-6`;

const StyledButton = tw.button`mt-8 cursor-pointer w-full text-sm font-bold tracking-wider bg-transparent 
                              hover:bg-black text-black font-semibold 
                              hover:text-white py-4 px-12 border-2 border-black hover:border-transparent 
                              small:fixed small:bottom-0 small:left-0 small:bg-black small:text-white`;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["product", id], () => api.getProductById(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const getProductImages = (product) =>
  product.images.map((image) => {
    const originalImageUrl =
      image.image.url && image.image.url.includes("localhost")
        ? `${image.image.url}`
        : `${process.env.NEXT_PUBLIC_API_URL}${image.image.url}`;
    const thumbnailUrl =
      image.image.url && image.image.url.includes("localhost")
        ? `${image.image.sizes.thumbnail.url}`
        : `${process.env.NEXT_PUBLIC_API_URL}${image.image.sizes.thumbnail.url}`;
    return {
      original: originalImageUrl,
      thumbnail: thumbnailUrl,
    };
  });

const renderButton = (onClick, title) => {
  return (
    <StyledButton onClick={onClick}>
      <div>{title}</div>
    </StyledButton>
  );
};

export default () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const [numberOfitems, updateNumberOfItems] = useState(1);

  const { data: product, isFetching } = useProduct(id);

  const productImages = useMemo(() => {
    if (!product) return [];
    return getProductImages(product);
  }, [product]);

  const goToCheckout = () => {
    router.push(`/checkout?product=${product.id}`);
  };

  if (isFetching || !product) {
    <Loader isLoading={isFetching} />;
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1);
  }

  function decrement() {
    if (numberOfitems === 1) return;
    updateNumberOfItems(numberOfitems - 1);
  }
  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  return (
    <Container>
      <ImageContainers>
        <ImageContainer>
          <ImageGallery
            items={productImages}
            showBullets={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            showNav={false}
            showFullscreenButton={true}
            useTranslate3D={false}
          />
        </ImageContainer>
      </ImageContainers>
      <DetailsContainer>
        <Title>{product.title}</Title>
        <SubTitle>${product.price}</SubTitle>
        <Description>
          {!!product.description ? product.description : loremIpsum}
        </Description>

        {true && (
          <>
            {/* TODO: Enable when product has stock */}
            {true && (
              <QuantityPickerContainer>
                <QuantityPicker
                  increment={increment}
                  decrement={decrement}
                  numberOfitems={numberOfitems}
                />
              </QuantityPickerContainer>
            )}
            {renderButton(goToCheckout, "Comprar")}
          </>
        )}
      </DetailsContainer>
    </Container>
  );
};
