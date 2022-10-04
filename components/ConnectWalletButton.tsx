import { useEffect, useRef } from "react";
import { ConnectWallet } from "../context/WalletProvider";
import CButton from "./Button";

export default function ConnectWalletButton() {
     const stateInit = useRef<boolean>();



     useEffect(() => {
          if (stateInit.current == true) {

          }
          return () => { stateInit.current = true }
     });

     const onButtonClick = () => {
          ConnectWallet();
     }



     return <>
          <CButton text="Connect Wallet" onClick={onButtonClick} center={false} />
     </>
}
