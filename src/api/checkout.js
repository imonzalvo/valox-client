import axios from "axios";

export const getCheckoutInfo = async (product) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/checkout/${process.env.NEXT_PUBLIC_BUSINESS_HANDLE}`,
    { products: [{ id: product}] }
  );

  return data;
};
