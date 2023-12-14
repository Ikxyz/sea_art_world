import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useWalletProviders } from "../context/WalletProvider";
import { toggleSidebar } from "../store/slices/navigation";
import { useAccount } from "wagmi";

export default function DesktopNavItem({ route, component, name, isProtected }: { route?: string, name: string, component?: JSX.Element, isProtected: boolean }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {  isConnected } = useAccount()

  const openAndCloseSideBar = () => {
    dispatch(toggleSidebar());
  };
  const onClick = () => {
    openAndCloseSideBar();
    if (!route) return;
    router.push(route);
  }
  if (isProtected) {
    if (!isConnected) {
      return <></>
    }
  }

  return <li onClick={onClick} className="p-4 text-lg text-white cursor-pointer" key={name + route}>
    {component ? component : name}
  </li>
}