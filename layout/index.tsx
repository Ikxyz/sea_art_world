/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import Images from "../assets/images";
import { toggleSidebar } from "../store/slices/navigation";
import Sidebar from "./sidebar";
import { useEffect } from 'react';
import { loadFromCache } from "../store/slices/auth";
import { useGetTransactionsConfigQuery } from "../services/config";
import { useCurrenciesQuery } from "../services/currency";
import { RootState } from '../store/index';
import CButton from "../components/Button";
import { Footer } from "../components/Footer";
import ConnectWalletButton from "../components/ConnectWalletButton";

const NavLinks = [
  { name: "Connect Wallet", route: "" },
  { name: "My Gallery", route: "account", isDialog: true },
  // { name: "Blog", route: "" },
  // { name: "NFT", route: "" },
  // { name: "P2P", route: "" },
];

const _REFRESH_TIME = 30 * 1000;

export default function Layout({ children }: { children: any }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((e: RootState) => e.auth);



  const openAndCloseSideBar = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    dispatch(loadFromCache());

    if (!isLoggedIn) return;
    const disposeId = setInterval(() => {

    }, _REFRESH_TIME);
    return () => clearInterval(disposeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (<>

    <div className="box-border relative w-full max-w-[1900px] h-screen mx-auto ">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="relative w-full h-full ">

        {/* Desktop Nav Bar */}
        <div className=" bg-nav_background backdrop-blur-xl lg:pl-[135px] px-[30px] py-[25px] z-20 flex content-between justify-between w-full ">
          <Link href="/">
            <a>
              <img
                src={Images.logo_full.src}
                className="lg:h-[60px] h-[40px]"
                alt="tradefada logo"
              />
            </a>
          </Link>

        <ConnectWalletButton/>

        </div>
        {/* Mobile SideBar */}
        {/* <Sidebar navLinks={NavLinks} /> */}

        <main className="relative h-full ">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>


  </>
  );
}
