import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrder } from "../api/orders_api";

/**
 *
 * @param userId
 * @returns
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(fetchOrder, {
    onSuccess: () => queryClient.invalidateQueries(["cartitems"]),
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      // console.log("data", data);
      // console.log("error", error);
      // console.log("variables", variables);
      // console.log("context", context);
    },
  });
};
