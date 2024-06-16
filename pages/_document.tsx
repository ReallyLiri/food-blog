import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import React from "react";

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html dir="rtl" lang="he">
        <Head>
          <script
            defer
            src="/js/pace.min.js"
            data-pace-options='{ "restartOnPushState": false }'
          ></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
