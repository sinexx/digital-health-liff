import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        {/* Fonts: Inter + Noto Sans Thai */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Sans+Thai:wght@400;600&display=swap" rel="stylesheet" />
        {/* Tailwind Play CDN (temporary until build-time Tailwind is installed) */}
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
