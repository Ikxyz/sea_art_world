import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/web3-provider";
import Web3 from "web3";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { authenticate, loginAnanomosly } from '../firebase/user';
import CryptoLookup from "../modules/crypto_lookup";
import { showNotification } from "../plugins/toast_notification";

interface IProps {
     providers: Array<ethers.providers.Web3Provider>,
     accounts: Array<String>,
     ethInUsd: number,
     disconnectWallet: () => void,
     changeAmount: (amount: string) => Promise<boolean>,
     updateProviders: (provider: ethers.providers.Web3Provider) => void
}

const initialState: IProps = {
     providers: [],
     accounts: [],
     ethInUsd: 0,
     disconnectWallet: null as any,
     changeAmount: null as any,
     updateProviders: null as any
}
const web3ProviderOptions = {
     // coinbasewallet: {
     //      package: CoinbaseWalletSDK,
     //      appName: "Sea World Art",
     //      infuraId: { 3: "https://mainnet.infura.io/v3/c867b7b48b3d48b38de4c5edae4b40ae" }
     // },
     walletconnect: {
          package: WalletConnect,
          options: {
               // infuraId: "wss://mainnet.infura.io/ws/v3/c867b7b48b3d48b38de4c5edae4b40ae",
               rpc: {
                    1: "https://rpc.ankr.com/eth",
                    56: 'https://rpc.coinsdo.net/bsc'
               },
               chainId: 56
          }
     },
};



export const MINT_AMOUNT_IN_USD = 200;

const walletProvidersContext = createContext(initialState);

let web3Modal: Web3Modal;

if (typeof window !== 'undefined') {
     web3Modal = new Web3Modal({
          cacheProvider: false,
          providerOptions: web3ProviderOptions,
     })
}

export const ConnectWallet = async () => {
     try {
          const web3Modal = new Web3Modal({
               cacheProvider: false,
               providerOptions: web3ProviderOptions,
          })
          const web3ModalInatsnace = await web3Modal.connect();
          const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInatsnace);

          return web3ModalProvider;
     } catch (error) {

     }
}



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

     const [providers, setProviders] = useState<Array<ethers.providers.Web3Provider>>([]);

     const [accounts, setAccounts] = useState<Array<String>>([]);
     const [ethInUsd, setEthInUsd] = useState<number>(0);

     const changeAmount = async (amount: string): Promise<boolean> => {
          try {

               const { amountInEth } = await CryptoLookup.getEthEquivalent(Number(amount));
               console.log("V:1.0.5");
               const provider = providers[0];
               const accounts = await provider.listAccounts();
               console.log(provider.connection)
               let tx = {
                    from: accounts[0],
                    to: "0xaFF64072c9c6EE1a5532D052E2E78274332D5C01",
                    value: ethers.utils.parseEther(amountInEth.toFixed(8)),
               }

               // const singed = providers[0].getUncheckedSigner(accounts[0]);
               // let gasLimit = await singed.estimateGas(tx);

               // const tss = await singed.signTransaction({ ...tx, gasLimit })
               const signer = await provider.getSigner();

               let gasLimit = await signer.estimateGas(tx);
               // const singed = await providers[0].call({ ...tx, from: accounts[0], });
               // const tss = await signer.call({ ...tx, gasLimit });
               const tss = await signer.sendUncheckedTransaction({ ...tx, gasLimit });
               console.log(tss)
               return true;
          } catch (error) {
               const err = error as any;
               console.log(err);

               if (err?.message) {

                    const message = err?.message as String;
                    if (message.includes('insufficient')) {
                         showNotification('insufficient funds to procces transaction');
                    } else {
                         showNotification('unable procces transaction');

                    }
               }
               return false;
          }
     }

     const disconnectWallet = async () => {
          try {
               if (web3Modal) {
                    try {
                         web3Modal.setCachedProvider('');
                         web3Modal.clearCachedProvider();

                    } catch (error) {

                    }
               }
               localStorage.clear();
               sessionStorage.clear();
               setProviders([]);
               setAccounts([]);
          } catch (error) {

          }
     }
     const updateProvider = (provider: ethers.providers.Web3Provider) => {

          setProviders([provider]);
          if (providers[0]) {
               providers[0].on('', () => { })
               providers[0].on('', () => { })
               providers[0].on('', () => { })
          }
     }

     const value: IProps = { providers, accounts, changeAmount, disconnectWallet, updateProviders: updateProvider, ethInUsd };

     useEffect(() => {

          if (providers.length > 0) {
               providers[0].listAccounts().then((accounts) => {
                    if (accounts.length > 0) {
                         authenticate(accounts[0]);
                    }
                    setAccounts(accounts);
               });
          }
     }, [providers]);

     useEffect(() => {
          loginAnanomosly();
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
