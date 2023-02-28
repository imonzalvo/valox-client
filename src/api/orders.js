import axios from "axios";

export const getOrderById = async (id) => {
  const { data } = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}?depth=3`,
  });

  return data;
};

export const createOrder = async (data) => {
  const products = data.products.map((product) => {
    return {
      id: product.id,
      quantity: 1,
    };
  });

  const request = {
    clientName: `${data.name} ${data.lastName}`,
    clientEmail: data.email,
    clientPhone: data.phone,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    shippingOption: data.shippingOption,
    paymentMethod: data.paymentMethod,
    products: products,
  };

  console.log("req", request, data);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/create_order/${process.env.NEXT_PUBLIC_BUSINESS_HANDLE}`,
    request
  );

  return response.data;
};
