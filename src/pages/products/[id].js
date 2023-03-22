import { useState, useMemo } from "react";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";


import * as api from "../../api/products";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../providers/Cart";

import QuantityPicker from "../../components/products/QuantityPicker";
import Rating from "@/components/products/rating";
import ColorPicker from "@/components/products/colors";
import Topbar from "@/components/products/topBar";
import ProductImages from "@/components/products/productImages";
import ProductInfo from "@/components/products/productInfo";

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
  const [selectedImage, setSelectedImage] = useState(product.images[0].image.url)

  const { cart, addItemToCart, isProductInCart } = useCart();

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

    router.push(`/checkout?product=${product.id}`);
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
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -mx-4">
          <Topbar productTitle={product.title} />
          <ProductImages
            setSelectedImage={setSelectedImage}
            images={product.images}
            selectedImage={selectedImage}
          />
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
