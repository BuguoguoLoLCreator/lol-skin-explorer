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
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icons/logo-192.png" />
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
