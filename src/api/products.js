import axios from "axios";

export const getProductById = async (id) => {
  const { data } = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
  });

  return data;
};
