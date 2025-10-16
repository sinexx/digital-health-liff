import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      {/* Load LIFF SDK asynchronously on the client to avoid synchronous script rules */}
      <Script
        src="https://static.line-scdn.net/liff/edge/2/sdk.js"
        strategy="afterInteractive"
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
