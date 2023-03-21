import {
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreateBulkProduct,
  CreateProduct,
  GetProducts,
} from "../api/products_api";

export const useGetProducts = (companyId: any) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await GetProducts(companyId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};

export function useCreateProducts(companyId: any, productsdata: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(() => CreateBulkProduct(companyId, productsdata), {
    // useMutation훅은 첫번째 훅으로 데이터 페치 함수를 받는다. 그 후 성공했는 지 실패했는지에 따라 onSuccess, onError, onSettled를 제공한다.
    onSuccess: () => {
      // useMutation과 궁합이 잘맞는 invalidateQueries이다.
      queryClient.invalidateQueries(["products"]);
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

export function useCreateProduct(companyId: any, productdata: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(() => CreateProduct(companyId, productdata), {
    // useMutation훅은 첫번째 훅으로 데이터 페치 함수를 받는다. 그 후 성공했는 지 실패했는지에 따라 onSuccess, onError, onSettled를 제공한다.
    onSuccess: () => {
      // useMutation과 궁합이 잘맞는 invalidateQueries이다.
      queryClient.invalidateQueries(["products"]);
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

export async function UseGetProductsForStaticProps(companyId: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const data = await GetProducts(companyId);
          return data;
        },
      }),
    ]);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    console.log("index 페이지 try 에러", e);
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
}
