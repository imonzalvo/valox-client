import { useState, useMemo } from "react";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ImageGallery from "react-image-gallery";

import * as api from "../../../api/products";
import { getHomeInfo } from "@/api/homeInfo";
import { useProduct } from "../../../hooks/useProduct";
import { useCart } from "../../../providers/Cart";
import { useHomeInfo } from "@/hooks/useHomeInfo";

import QuantityPicker from "../../../components/products/QuantityPicker";
import Rating from "@/components/products/rating";
import ColorPicker from "@/components/products/colors";
import Topbar from "@/components/products/topBar";
import ProductImages from "@/components/products/productImages";
import ProductInfo from "@/components/products/productInfo";
import Head from "next/head";
import { getCheckoutOrderInfo } from "@/helpers/routedHelper";
import { useWidth } from "@/hooks/helpers/useWidth";

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
const ImageContainers = tw.div`w-full md:w-1/2 h-120 flex-1 mb-12 mx-4`;
const QuantityPickerContainer = tw.div`my-6`;
const StyledButton = tw.button`mt-8 cursor-pointer w-full text-sm font-bold tracking-wider bg-transparent 
                              hover:bg-black text-black font-semibold 
                              hover:text-white py-4 px-12 border-2 border-black hover:border-transparent 
                              small:fixed small:bottom-0 small:left-0 small:bg-black small:text-white`;
const AddToCart = tw.div`text-base text-black font-semibold flex flex-row cursor-pointer underline`;

export const getServerSideProps = async (ctx) => {
  const { business, id } = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["product", id], () => api.getProductById(id));
  await queryClient.fetchQuery(["homeInfo"], () => getHomeInfo(business));

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
  const {
    push,
    query: { business, id },
  } = useRouter();
  const [numberOfitems, updateNumberOfItems] = useState(1);
  const width = useWidth();

  const { data: product, isFetching } = useProduct(id);
  const { data: companyInfo } = useHomeInfo(business);

  const [selectedImage, setSelectedImage] = useState(
    product.images[0].image.url
  );

  const { cart, addItemToCart, isProductInCart } = useCart();

  const productImages = useMemo(() => {
    if (!product) return [];
    return getProductImages(product);
  }, [product]);

  const addToCart = () => {
    addItemToCart({
      id,
      quantity: numberOfitems,
      product: {
        id: id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.images[0].image.sizes.thumbnail.url,
      },
    });
  };

  const goToCheckout = () => {
    const orderProducts = [
      {
        id,
        quantity: numberOfitems,
      },
    ];
    push({
      pathname: getCheckoutOrderInfo(business),
      query: { rawProducts: JSON.stringify(orderProducts) },
    });
  };

  function increment() {
    updateNumberOfItems(numberOfitems + 1);
  }

  function decrement() {
    if (numberOfitems === 1) return;
    updateNumberOfItems(numberOfitems - 1);
  }

  const isMobile = useMemo(() => {
    return width < 1024 || false;
  }, [width]);

  return (
    <section className="max-w-6xl w-full pt-8 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
      <Head>
        <title>{`${companyInfo.company.name} | ${product.title}`}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-4 mx-auto">
        {/* // TODO: Flex wrap working badly */}
        <div className="flex flex-wrap -mx-4">
          <Topbar
            business={companyInfo.company.name}
            productTitle={product.title}
          />
          <ImageContainers>
            <ImageContainer>
              <ImageGallery
                items={productImages}
                showBullets={false}
                useBrowserFullscreen={false}
                showPlayButton={false}
                showNav={isMobile}
                showFullscreenButton={true}
                useTranslate3D={false}
                thumbnailPosition={isMobile ? undefined : "left"}
                showIndex={isMobile}
                showThumbnails={!isMobile}
              />
            </ImageContainer>
          </ImageContainers>
          <div className="w-full lg:w-1/2 px-4 mx-4">
            <ProductInfo
              product={product}
              availableShippingOptions={
                companyInfo.company.configurations.availableShippingOptions
              }
              availablePaymentMethods={
                companyInfo.company.configurations.availablePaymentMethods
              }
            />
            {/* <Rating />
            <ColorPicker /> */}
            <QuantityPickerContainer>
              <QuantityPicker
                increment={increment}
                decrement={decrement}
                numberOfitems={numberOfitems}
              />
            </QuantityPickerContainer>
            {/* <AddToCart onClick={() => addToCart()}>
              Agregar al carrito
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                width="20px"
                height="20px"
                viewBox="0 0 902.86 902.86"
                className="ml-2"
              >
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    />
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                    />
                  </g>
                </g>
              </svg>
            </AddToCart> */}
            {renderButton(goToCheckout, "Comprar")}
          </div>
        </div>
      </div>
    </section>
  );
}
