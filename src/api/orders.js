import { getProductDefaultImages } from "@/helpers/utils";
import axios from "axios";

const mapProducts = (products) => {
  return products.map((product) => {
    return {
      id: product.product.id,
      quantity: product.quantity,
      price: product.unitPrice,
      title: product.title,
      image: getProductThumbnailImage(product),
    };
  });
};

const getProductThumbnailImage = (product) => {
  if(product.product?.images.length) {
    return product.product?.images[0]?.image.sizes?.thumbnail.url;
  }

  return getProductDefaultImages()[0].image.sizes.thumbnail.url;
}

export const getOrderById = async (id) => {
  const { data } = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}?depth=4`,
  });

  return {
    id: data.id,
    createdAt: data.createdAt,
    details: {
      totalAmount: data.details.totalAmount,
      paymentMethod: {
        name: data.paymentMethod.name,
        description: data.paymentMethod.description,
        cost: data.details.paymentMethodCost,
      },
      shippingOption: {
        name: data.shippingOption.name,
        description: data.shippingOption.description,
        cost: data.details.shippingCost,
      },
    },
    payment: data.payment,
    products: mapProducts(data.products),
    status: data.status,
  };
};

export const createOrder = async ( data) => {
  console.log("hola?", data)
  const products = data.products.map((product) => {
    return {
      id: product.id,
      quantity: 1,
    };
  });

  const request = {
    clientName: data.name,
    clientLastName: data.lastName,
    clientEmail: data.email,
    clientPhone: data.phone,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    shippingOption: data.shippingOption,
    paymentMethod: data.paymentMethod,
    products: products,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/create_order/${data.businessHandle}`,
    request
  );

  return response.data;
};
