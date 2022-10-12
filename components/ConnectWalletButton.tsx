import { useEffect, useMemo, useRef, useState } from "react";
import { ConnectWallet, useWalletProviders } from "../context/WalletProvider";
import CButton from "./Button";

export default function ConnectWalletButton() {
     const { updateProviders, providers, disconnectWallet } = useWalletProviders();

     const [account, setAccount] = useState<Array<String>>([]);

     const connetedAccountString = account.length > 0 ? account[0].substring(0, 6) : '';
     const onButtonClick = async () => {
          const provider = await ConnectWallet();
          if (!provider) return;
          updateProviders(provider);
     }

     useEffect(() => {
          if (providers.length > 0) {
               providers[0].listAccounts().then(setAccount);
          }
     }, [providers]);



     return <>
          {providers.length > 0 ? <CButton onClick={disconnectWallet} outlined center={false} text={`Disconnet: ${connetedAccountString}`} /> : <CButton text="Connect Wallet" onClick={onButtonClick} center={false} />}
     </>
}
