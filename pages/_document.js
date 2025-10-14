import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="th">
      <Head>{/* External LIFF script removed (we use @line/liff package) */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
