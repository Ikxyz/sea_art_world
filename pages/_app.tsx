import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from "../layout";
import store from '../store';
import "../styles/font.scss";
import "../styles/globals.scss";
import ToastNotification from '../plugins/toast_notification';
import Dialogs from '../components/Dialogs';
import WalletProvider from "../context/WalletProvider";
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WalletProvider  >
        <ToastNotification />
        <Dialogs />
        <Layout>
          <Head>
            <title>Sea Art World | Explore, Create & Sell Your NFT</title>
            <meta name="description" content="Buy And Sell NFTs And Browse Our Small Scale Collection Of Digital Art And Collectibles By Top Artists From Around The World." />
            <meta name="robots" content="index, follow" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>

    </Provider>
  );
}

export default MyApp
