/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Images from "../assets/images";
import RenderIf from "../components/RenderIf";
import { useWalletProviders } from "../context/WalletProvider";
import { RootState } from "../store";
import { toggleSidebar } from "../store/slices/navigation";
import MobileNavItem from "./mobile_nav_item";

interface IPrams {
  navLinks: Array<{ name: string; route: string, component?: JSX.Element, protected: boolean }>;
}




function Sidebar({ navLinks }: IPrams) {
  const navigationState = useSelector((root: RootState) => root.navigation);
  const { isLoggedIn } = useSelector((root: RootState) => root.auth);

  const dispatch = useDispatch();

  const openAndCloseSideBar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`${navigationState.isNaveOpen ? "flex" : "hidden"
        } fixed    z-[200]       w-screen h-screen  lg:hidden    `}
    >
      <div onClick={openAndCloseSideBar} className="bg-black bg-opacity-80" />
      <div className="box-border relative px-6 py-6 ml-auto min-w-fit max-w-[320px]  bg-primary">
        {/* <img
          onClick={openAndCloseSideBar}
          src={Images.sidebar_menu.src}
          className="block w-10 h-6 ml-auto"
          alt="sidebar menu"
        /> */}

        {/* <RenderIf isTrue={isLoggedIn}>
          <div className="flex items-start content-center justify-center h-full pt-14">
            <DashboardSideBarSideBar />
          </div>
        </RenderIf> */}
        <RenderIf isTrue={isLoggedIn === false}>
          <ul className="flex flex-col content-center justify-center my-16 list-none divide-y-2 divide-gray-500 w-fit divide-opacity-10">
            {navLinks.map((e, i) => <MobileNavItem key={e.route + i} name={e.name} component={e.component} route={e.route} isProtected={e.protected} />)}
          </ul>
          {/* <MyAccount /> */}
        </RenderIf>
      </div>
    </div>
  );
}

export default Sidebar;
