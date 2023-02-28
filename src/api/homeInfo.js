import axios from "axios";

export const getHomeInfo = async () => {
  const { data } = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/companies/handle/${process.env.NEXT_PUBLIC_BUSINESS_HANDLE}`,
  });

  return data;
};
