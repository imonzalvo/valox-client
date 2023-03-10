import { useQuery } from "@tanstack/react-query";
import * as api from "../api/checkout";

export const useCheckoutInfo = (product) => {
  return useQuery({
    queryKey: ["checkout", product],
    queryFn: () => api.getCheckoutInfo(product),
    enabled: !!product
  });
};
