import {
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteCartItem,
  fetchCartItems,
  getCartItems,
  modifyCartItem,
} from "../api/carts_api";

/**
 *
 * @param userId
 * @param productId
 * @param qty
 * @returns
 */
export const useAddCart = () => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(fetchCartItems, {
    onSuccess: () => queryClient.invalidateQueries(["cartitems"]),
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      if (data && data.data && data.data.errorMessage) {
        alert(data.data.errorMessage);
      }
      // console.log("data", data);
      // console.log("error", error);
      // console.log("variables", variables);
      // console.log("context", context);
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartitems"]);
      alert("삭제했습니다");
    },
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      if (data && data.data && data.data.errorMessage) {
        alert(data.data.errorMessage);
      }
      // console.log("data", data);
      // console.log("error", error);
      // console.log("variables", variables);
      // console.log("context", context);
    },
  });
};

export const useModifyCart = () => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(modifyCartItem, {
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

export function useGetCartItems(userId: any) {
  return useQuery({
    queryKey: ["cartitems"],
    queryFn: async () => {
      const data = await getCartItems(userId);
      return data;
    },
    onError: (e) => console.log("e", e),
    enabled: !!userId,
  });
}

export async function UseGetCartItemsForStaticProps(userId: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["cartitems"],
        queryFn: async () => {
          const data = await getCartItems(userId);
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
