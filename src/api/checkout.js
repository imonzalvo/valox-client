import axios from "axios";

export const getCheckoutInfo = async (handle, product) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/checkout/${handle}`,
    { products: [{ id: product}] }
  );

  return res.data;
};
