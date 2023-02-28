import { useQuery } from "@tanstack/react-query";
import * as api from "../api/homeInfo";

export const useHomeInfo = () => {
  return useQuery({
    queryKey: ["homeInfo"],
    queryFn: api.getHomeInfo,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });
};
