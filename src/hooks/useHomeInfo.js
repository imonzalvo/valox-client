import { useQuery } from "@tanstack/react-query";
import * as api from "../api/homeInfo";

export const useHomeInfo = (business) => {
  return useQuery({
    queryKey: ["homeInfo"],
    queryFn: () => api.getHomeInfo(business),
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });
};
