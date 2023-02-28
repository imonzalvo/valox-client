import axios from "axios";

export const getCategoryById = async (id) => {
    console.log("id", id)
  const { data } = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}/products`,
  });

  return data;
};
