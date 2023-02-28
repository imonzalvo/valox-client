import { useQuery } from "@tanstack/react-query";
import * as api from "../api/categories";

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => api.getCategoryById(id),
    enabled: id != "todos",
    staleTime: Infinity,
  });
};
