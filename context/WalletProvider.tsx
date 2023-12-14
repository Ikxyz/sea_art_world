import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletConnect from "@walletconnect/web3-provider";
// import Web3 from "web3";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { authenticate, loginAnanomosly as loginAnonymously } from '../firebase/user';
import CryptoLookup from "../modules/crypto_lookup";
import { showNotification } from "../plugins/toast_notification";
import { WagmiConfig, configureChains, createConfig, mainnet, useAccount, useDisconnect } from "wagmi";

import { publicProvider } from 'wagmi/providers/public'
import { sendTransaction } from '@wagmi/core'
import * as Viem from "viem";


interface IProps {
     ethInUsd: number,
     disconnectWallet: () => void,
     changeAmount: (amount: string) => Promise<boolean>,
}

const initialState: IProps = {
     ethInUsd: 0,
     disconnectWallet: null as any,
     changeAmount: null as any,
}

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '39e18a7dce4aae7c7b0f6aa82f06175c'

// 2. Create wagmiConfig
const metadata = {
     name: 'Sea Art World Gallery',
     description: 'Connect wallet',
     url: 'https://web3modal.com',
     icons: ['https://www.seaartworldgallery.com/_next/static/media/logo-full.f92d579b.png']
}

// const chains = [mainnet]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })


// createWeb3Modal({ wagmiConfig, projectId, chains })

// const web3ProviderOptions = {
//      // coinbasewallet: {
//      //      package: CoinbaseWalletSDK,
//      //      appName: "Sea World Art",
//      //      infuraId: { 3: "https://mainnet.infura.io/v3/c867b7b48b3d48b38de4c5edae4b40ae" }
//      // },
//      walletconnect: {
//           package: WalletConnect,
//           ethers
//           options: {
//                // infuraId: "wss://mainnet.infura.io/ws/v3/c867b7b48b3d48b38de4c5edae4b40ae",
//                rpc: {
//                     1: "https://rpc.ankr.com/eth",
//                     56: 'https://rpc.coinsdo.net/bsc'
//                },
//                chainId: 56
//           }
//      },
// };



export const MINT_AMOUNT_IN_USD = 199;

const walletProvidersContext = createContext(initialState);

// let web3Modal: Web3Modal;

if (typeof window !== 'undefined') {
     // web3Modal = new Web3Modal({
     //      cacheProvider: false,
     //      providerOptions: web3ProviderOptions,
     // })
}

// export const ConnectWallet = async () => {
//      try {
//           // const web3Modal = new Web3Modal({
//           //      cacheProvider: false,
//           //      providerOptions: web3ProviderOptions,
//           // })
//           // const web3ModalInatsnace = await web3Modal.connect();
//           // const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInatsnace);

//           return web3ModalProvider;
//      } catch (error) {

//      }
// }



// const provider = new WalletConnectProvider({
//      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
// });
// export const ConnectWallet = async () => {
//      //  Create WalletConnect Provider

//      await provider.enable();

// //  Wrap with Web3Provider from ethers.js
// const web3Provider = new providers.Web3Provider(provider);

//      // Subscribe to accounts change
// provider.on("accountsChanged", (accounts: string[]) => {
//      console.log(accounts);
//    });

//    // Subscribe to chainId change
//    provider.on("chainChanged", (chainId: number) => {
//      console.log(chainId);
//    });

//    // Subscribe to session disconnection
//    provider.on("disconnect", (code: number, reason: string) => {
//      console.log(code, reason);
//    });

//      provider.send()
//      //  Create Web3
//      const web3 = new Web3(provider as any);

//      provider.on("connect", () => {
//           console.log("connect");
//         });


// }

export const useWalletProviders = () => useContext(walletProvidersContext);





export default function WalletProvidersProvider({ children }: any) {


     const [ethInUsd, setEthInUsd] = useState<number>(0);
     const { disconnect } = useDisconnect()
     const { address, isConnecting, isDisconnected } = useAccount();

     const changeAmount = async (amount: string): Promise<boolean> => {
          try {

               const { amountInEth } = await CryptoLookup.getEthEquivalent(Number(amount));
               console.log("V:1.0.5");
               let tx = {
                    from: address,
                    to: "0xbcf371e8Ae83D2e93f1564922223503BaC8CE517",
                    value: ethers.utils.parseEther(amountInEth.toFixed(8)),
               }

               // const singed = providers[0].getUncheckedSigner(accounts[0]);
               // let gasLimit = await singed.estimateGas(tx);

               // const tss = await singed.signTransaction({ ...tx, gasLimit })
               // const signer = await provider.getSigner();

               // let gasLimit = await signer.estimateGas(tx);
               // const singed = await providers[0].call({ ...tx, from: accounts[0], });
               // const tss = await signer.call({ ...tx, gasLimit });
               const tss = await sendTransaction({
                    to: tx.to,
                    value: Viem.parseEther(amountInEth.toString()),
               })
               // const tss = await signer.sendUncheckedTransaction({ ...tx, gasLimit });
               console.log(tss)
               return true;
          } catch (error) {
               const err = error as any;
               console.log(err);

               if (err?.message) {

                    const message = err?.message as String;
                    if (message.includes('insufficient')) {
                         showNotification('insufficient funds to process transaction');
                    } else {
                         showNotification('unable process transaction');

                    }
               }
               return false;
          }
     }

     const disconnectWallet = async () => {
          try {
               // if (web3Modal) {
               //      try {
               //           web3Modal.setCachedProvider('');
               //           web3Modal.clearCachedProvider();

               //      } catch (error) {

               //      }
               // }
               await disconnect();
               localStorage.clear();
               sessionStorage.clear();
          } catch (error) {

          }
     }


     const value: IProps = { changeAmount, disconnectWallet, ethInUsd };


     useEffect(() => {
          loginAnonymously();
          const getAmount = async () => {
               const amt = await CryptoLookup.getEthEquivalent(1);
               setEthInUsd(amt.currentUSDAmount);
          }
          getAmount();
          const interfavId = setInterval(getAmount, 15 * 1000);
          return () => clearInterval(interfavId);
     }, [])
     return <walletProvidersContext.Provider value={value}>
          {children}
     </walletProvidersContext.Provider>


}
