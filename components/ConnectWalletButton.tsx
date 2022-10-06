import { useEffect, useMemo, useRef, useState } from "react";
import { ConnectWallet, useWalletProviders } from "../context/WalletProvider";
import CButton from "./Button";

export default function ConnectWalletButton() {
     const { updateProviders, providers } = useWalletProviders();

     const [account, setAccount] = useState<Array<String>>([]);

     const connetedAccountString = account.length > 0 ? account[0].substring(0, 10) : '';
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
          {providers.length > 0 ? <p className="text-white">Conneted: {connetedAccountString}</p> : <CButton text="Connect Wallet" onClick={onButtonClick} center={false} />}
     </>
}
