import styled from "@emotion/styled";

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
  return (
    <div>
      <BodyContainer>메인</BodyContainer>
    </div>
  );
}
