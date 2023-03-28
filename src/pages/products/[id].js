import { useState, useMemo } from "react";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ImageGallery from "react-image-gallery";

import * as api from "../../api/products";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../providers/Cart";

import QuantityPicker from "../../components/products/QuantityPicker";
import Rating from "@/components/products/rating";
import ColorPicker from "@/components/products/colors";
import Topbar from "@/components/products/topBar";
import ProductImages from "@/components/products/productImages";
import ProductInfo from "@/components/products/productInfo";
import Head from "next/head";

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
const ImageContainers = tw.div`w-full md:w-1/2 h-120 flex-1 mb-32 mr-8`;
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

export default function Product() {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const [numberOfitems, updateNumberOfItems] = useState(1);
  const { data: product, isFetching } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(
    product.images[0].image.url
  );

  const { cart, addItemToCart, isProductInCart } = useCart();

  const productImages = useMemo(() => {
    if (!product) return [];
    return getProductImages(product);
  }, [product]);

  const goToCheckout = () => {
    // addItemToCart({
    //   id,
    //   quantity: numberOfitems,
    //   product: {
    //     id: id,
    //     title: product.title,
    //     description: product.description,
    //     price: product.price,
    //     image: product.images[0].image.sizes.thumbnail.url,
    //   },
    // });

    router.push(`/checkout/orderInfo?product=${product.id}`);
  };

  function increment() {
    updateNumberOfItems(numberOfitems + 1);
  }

  function decrement() {
    if (numberOfitems === 1) return;
    updateNumberOfItems(numberOfitems - 1);
  }
  return (
    <section class="max-w-6xl pt-8 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_BUSINESS_TITLE} | ${product.title}`}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="container px-4 mx-auto">
        {/* // TODO: Flex wrap working badly */}
        <div class="flex flex-wrap -mx-4">
          <Topbar productTitle={product.title} />
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
          <div class="w-full lg:w-1/2 px-4">
            <ProductInfo product={product} />
            {/* <Rating />
            <ColorPicker /> */}
            <QuantityPickerContainer>
              <QuantityPicker
                increment={increment}
                decrement={decrement}
                numberOfitems={numberOfitems}
              />
            </QuantityPickerContainer>
            {renderButton(goToCheckout, "Comprar")}
          </div>
        </div>
      </div>
    </section>
  );
}
