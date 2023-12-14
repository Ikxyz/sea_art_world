"use client";

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
import { configureChains, mainnet, createConfig, WagmiConfig } from 'wagmi';
import { createPublicClient, http } from 'viem'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useEffect } from 'react';

export const metadata = {
  name: "Sea Art World Gallery",
  description: "Explore, Create & Sell Your NFT",
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})
const projectId = '39e18a7dce4aae7c7b0f6aa82f06175c';
const { chains, publicClient } = configureChains(
  [mainnet],
  [walletConnectProvider({ projectId }),]
)
// const { publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()],
// )

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
  ],
  publicClient
})
createWeb3Modal({ wagmiConfig, projectId, chains })


function MyApp({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
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
      </WagmiConfig>

    </Provider>
  );
}

export default MyApp
