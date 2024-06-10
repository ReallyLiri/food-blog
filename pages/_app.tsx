import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import FontFace from "@/components/font-face";
import ToTop from "@/components/ToTop";

import theme from "theme";
import Head from "next/head";
import "public/css/pace-theme-default.min.css";
import "public/css/app.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="theme-color" content="#319795" />
        <title>Food Blog</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToTop />
      </ChakraProvider>
      <FontFace />
    </>
  );
}

export default App;
