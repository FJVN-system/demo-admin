import { useQuery } from "@tanstack/react-query";
import { GetShippingByCompany } from "../api/shipping_api";

export const useGetShippingsByCompany = (companyId: any) => {
  return useQuery({
    queryKey: ["shippings"],
    queryFn: async () => {
      const data = await GetShippingByCompany(companyId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};
