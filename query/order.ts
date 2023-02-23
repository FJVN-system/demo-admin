import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrder, GetOrdersByCompanyId } from "../api/orders_api";

/**
 * @param userId
 * @returns
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(fetchOrder, {
    onSuccess: () => queryClient.invalidateQueries(["ordersItems"]),
    onError: (e) => console.log(e),
    // onSettled: (data, error, variables, context) => {
    // console.log("data", data);
    // console.log("error", error);
    // console.log("variables", variables);
    // console.log("context", context);
    // },
  });
};

export const useGetOrdersByCompany = (companyId: any) => {
  return useQuery({
    queryKey: ["ordersItems"],
    queryFn: async () => {
      const data = await GetOrdersByCompanyId(companyId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};
