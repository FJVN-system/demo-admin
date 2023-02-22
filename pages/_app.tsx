import React from "react";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { globalStyles } from "../global";
import Layout from "../components/layout";

export default function IndexPage({ Component, pageProps }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {globalStyles}
        <Head>
          <title>FJVN</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
