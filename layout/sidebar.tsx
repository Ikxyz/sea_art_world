/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux";
import Images from "../assets/images";
import RenderIf from "../components/RenderIf";
import { RootState } from "../store";
import { toggleSidebar } from "../store/slices/navigation";

interface IPrams {
  navLinks: Array<{ name: string; route: string }>;
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
        } fixed    z-50      w-screen h-screen  lg:hidden    `}
    >
      <div onClick={openAndCloseSideBar} className="bg-black bg-opacity-80" />
      <div className="box-border relative px-6 py-6 ml-auto min-w-fit max-w-[320px]  bg-grey-200 ">
        <img
          onClick={openAndCloseSideBar}
          src={Images.sidebar_menu.src}
          className="block w-10 h-6 ml-auto"
          alt="sidebar menu"
        />

        <RenderIf isTrue={isLoggedIn}>
          <div className="flex items-start content-center justify-center h-full pt-14">

          </div>
        </RenderIf>
        <RenderIf isTrue={isLoggedIn === false}>
          <ul className="flex flex-col content-center justify-center my-16 list-none divide-y-2 divide-gray-500 w-fit divide-opacity-10">
            {navLinks.map((e, i) => (
              <li className="p-4 text-lg cursor-pointer" key={e.name + i}>
                {e.name}
              </li>
            ))}
          </ul>

        </RenderIf>
      </div>
    </div>
  );
}

export default Sidebar;
