import { useEffect, useMemo, useRef, useState } from "react";
import { useWalletProviders } from "../context/WalletProvider";
import CButton from "./Button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function ConnectWalletButton() {
     const { disconnectWallet } = useWalletProviders();
     const { address, isConnected } = useAccount()
     const { open } = useWeb3Modal()

     const connectedAccountString = address?.length ?? 0 > 0 ? address?.substring(0, 6) : '';
     const onButtonClick = async () => {
          // const provider = await ConnectWallet();
          await open();
          // if (!provider) return;
          // updateProviders(provider);
     }

     // useEffect(() => {
     //      if (providers.length > 0) {
     //           providers[0].listAccounts().then(setAccount);
     //      }
     // }, [providers]);



     return <>
          {isConnected ? <CButton onClick={disconnectWallet} outlined center={false} text={`Disconnect: ${connectedAccountString}`} /> : <CButton text="Connect Wallet" onClick={onButtonClick} center={false} />}
     </>
}
