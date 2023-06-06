/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV !== "production" && (
          <script
            dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }}
          />
        )}
      </Head>
      <body className="bg-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
