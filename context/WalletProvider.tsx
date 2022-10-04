import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef } from "react";
import Web3Modal from "web3modal";

interface IProps {

}

const initialState: IProps = {}

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

          console.log(web3ModalProvider);
     } catch (error) {

     }
}

export const useWalletProviders = () => useContext(walletProvidersContext);



export default function WalletProvidersProvider({ children }: any) {
     const value: IProps = { ...initialState, };

     return <walletProvidersContext.Provider value={value}>
          {children}
     </walletProvidersContext.Provider>
}
