import { useQuery } from "@tanstack/react-query";
import * as api from "../api/orders";

export const useOrder = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.getOrderById(id),
    staleTime: 0
  });
};
