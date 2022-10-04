/* eslint-disable @next/next/google-font-display */
import Document, { Head, Html, Main, NextScript } from "next/document";


export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#240E42" />
          <meta name="msapplication-TileColor" content="#240E42" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <body><Main /></body>

        <NextScript />
      </Html>
    );
  }
}
