import { useQuery } from "@tanstack/react-query";
import * as api from "../api/checkout";

export const useCheckoutInfo = (handle, product) => {
  return useQuery({
    queryKey: ["checkout", product],
    queryFn: () => api.getCheckoutInfo(handle, product),
    enabled: !!product
  });
};
