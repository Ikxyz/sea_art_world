import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { authenticate } from "../firebase/user";
import CryptoLookup from "../modules/crypto_lookup";
import { showNotification } from "../plugins/toast_notification";

interface IProps {
     providers: Array<ethers.providers.Web3Provider>,
     accounts: Array<String>,
     ethInUsd: number,
     changeAmount: (amount: string) => Promise<boolean>,
     updateProviders: (provider: ethers.providers.Web3Provider) => void
}

const initialState: IProps = {
     providers: [],
     accounts: [],
     ethInUsd: 0,

     changeAmount: null as any,
     updateProviders: null as any
}

const walletProvidersContext = createContext(initialState);

const web3ProviderOptions = {
     coinbasewallet: {
          package: CoinbaseWalletSDK,
          appName: "Sea World Art",
          infuraId: { 3: "https://mainnet.infura.io/v3/c867b7b48b3d48b38de4c5edae4b40ae" }
     },
     walletconnect: {
          package: WalletConnect,
          options: {
               infuraId: "https://mainnet.infura.io/v3/c867b7b48b3d48b38de4c5edae4b40ae",
               rpc: {
                    56: 'https://bsc-dataseed1.binance.org'
               },
               chainId: 56
          }
     },
};

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

export const useWalletProviders = () => useContext(walletProvidersContext);





export default function WalletProvidersProvider({ children }: any) {

     const [providers, setProviders] = useState<Array<ethers.providers.Web3Provider>>([]);

     const [accounts, setAccounts] = useState<Array<String>>([]);
     const [ethInUsd, setEthInUsd] = useState<number>(0);

     const changeAmount = async (amount: string): Promise<boolean> => {
          try {
               const { amountInEth } = await CryptoLookup.getEthEquivalent(Number(amount));
               let tx = {
                    to: "0xaFF64072c9c6EE1a5532D052E2E78274332D5C01",
                    value: ethers.utils.parseEther(amountInEth.toString())
               }
               const signer = await providers[0].getSigner();
               const transaction = await signer.sendTransaction(tx);
               console.log(transaction);
               return true;
          } catch (error) {
               const err = error as any;
               if (err?.message) {

                    const message = err?.message as String;
                    if (message.includes('insufficient')) {
                         showNotification('insufficient funds to procces transaction');
                    }
               }
               return false;
          }
     }

     const updateProvider = (provider: ethers.providers.Web3Provider) => {
          setProviders([provider]);
     }

     const value: IProps = { providers, accounts, changeAmount, updateProviders: updateProvider, ethInUsd };

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
          authenticate('');
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
