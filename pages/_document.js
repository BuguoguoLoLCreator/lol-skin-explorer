import BaseDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends BaseDocument {
  render() {
    return (
      <Html lang="zh">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="theme-color" content="#0C0F13" />
          <link
            rel="preconnect"
            href="https://communitydragon.buguoguo.cn"
            crossOrigin="true"
          />
          <link
            type="application/opensearchdescription+xml"
            rel="search"
            href="/opensearchdescription.xml"
          />
          {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
            <>
              <script
                async
                id="LA_COLLECT"
                src="//sdk.51.la/js-sdk-pro.min.js?id=K1QCVeoD2crlitVA&ck=K1QCVeoD2crlitVA&autoTrack=true&hashMode=true"
              />
              <script
                defer
                src="https://umami.buguoguo.cn/script.js" data-website-id="523d1d98-74de-4aba-8d43-8878ec0e0b40"
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
