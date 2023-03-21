import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateCategory, GetCategory } from "../api/category_api";

export const useGetCategory = (companyId: any) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await GetCategory(companyId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};

export function useCreateCategory(companyId: any, categoryData: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(() => CreateCategory(companyId, categoryData), {
    // useMutation훅은 첫번째 훅으로 데이터 페치 함수를 받는다. 그 후 성공했는 지 실패했는지에 따라 onSuccess, onError, onSettled를 제공한다.
    onSuccess: () => {
      // useMutation과 궁합이 잘맞는 invalidateQueries이다.
      queryClient.invalidateQueries(["category"]);
    },
    onError: (e) => console.log("e", e),

    // onSettled(data, error, variables, context) {
    //   console.log("data", data);
    //   console.log("error", error);
    //   console.log("variables", variables);
    //   console.log("context", context);
    // },
  });
}
