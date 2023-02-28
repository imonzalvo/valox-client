import { useQuery } from "@tanstack/react-query";
import * as api from "../api/products";

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProductById(id),
  });
};
