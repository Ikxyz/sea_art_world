/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
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
import UploadNFTButton from "../components/UploadNFTButton";
import DesktopNavItem from "./desktop_nav_item";
import { useDispatch, useSelector } from "react-redux";

var google: any;




const NavLinks = [

  { name: "My Account", route: "account", isDialog: false, protected: true },

  { name: "Gallery", route: "gallery", isDialog: false, protected: false },
  { name: "Connect Wallet", route: "##", component: <ConnectWalletButton />, isDialog: false, protected: false },
  { name: "Upload NFT", route: "#", component: <UploadNFTButton />, isDialog: false, protected: true },
  // { name: "Blog", route: "" },
  // { name: "NFT", route: "" },
  // { name: "P2P", route: "" },
];

const _REFRESH_TIME = 30 * 1000;

var Tawk_API: any = Tawk_API || {},
  Tawk_LoadStart = new Date();


export default function Layout({ children }: { children: any }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((e: RootState) => e.auth);



  const openAndCloseSideBar = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    (function () {

      let s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0] as any;
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6347380254f06e12d899ddba/1gf735k3f';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })()
  }, []);
  useEffect(() => {
    setTimeout(() => {
      (function () {
        var googleTranslateElementInit = () => {
          new (google as any).translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        }
        let s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0] as any;
        s1.async = true;
        s1.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })()
    }, 3000)
  }, [])
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
      <div id="google_translate_element"></div>
      <div className="relative w-full h-full ">

        {/* Desktop Nav Bar */}
        <div className=" bg-nav_background backdrop-blur-xl xl:pl-[135px] px-[30px] py-[25px] z-20 flex content-between justify-between w-full ">
          <Link href="/">
            <a>
              <img
                src={Images.logo_full.src}
                className="xl:h-[60px] h-[40px]"
                alt="tradefada logo"
              />
            </a>
          </Link>
          <img
            onClick={openAndCloseSideBar}
            src={Images.sidebar_menu.src}
            className="block w-8 h-5 lg:hidden"
            alt="sidebar menu"
          />
          <ul className="items-center hidden space-x-10 text-white lg:flex">
            {NavLinks.map((e) => <DesktopNavItem isProtected={e.protected} name={e.name} component={e.component} route={e.route} key={e.route + 'desktop-nav-item'} />)}
          </ul>
        </div>
        {/* Mobile SideBar */}
        <Sidebar navLinks={NavLinks as any} />






        <main className="relative h-full ">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>



  </>
  );
}
