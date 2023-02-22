import styled from "@emotion/styled";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetUsers } from "../api/user_api";
import Cart from "../components/cart";
import Header from "../components/header";
import { useCreateUser } from "../query/users";

const BodyContainer = styled.div`
  display: flex;
`;

// export async function getStaticProps() {
// const queryClient = new QueryClient();
// try {
//   await Promise.all([queryClient.prefetchQuery(["users"], GetUsers)]);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// } catch (e) {
//   console.log("index 페이지 try 에러", e);
//   return {
//     notFound: true,
//   };
// } finally {
//   queryClient.clear();
// }
// }
export default function IndexPage() {
  const { data: usersData } = useQuery(["users"], GetUsers);

  return (
    <div>
      <BodyContainer>메인</BodyContainer>
    </div>
  );
}
