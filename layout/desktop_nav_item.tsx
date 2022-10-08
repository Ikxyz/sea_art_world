import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useWalletProviders } from "../context/WalletProvider";
import { toggleSidebar } from "../store/slices/navigation";

export default function DesktopNavItem({ route, component, name, isProtected }: { route?: string, name: string, component?: JSX.Element, isProtected: boolean }) {
     const router = useRouter();
     const dispatch = useDispatch();

     const { accounts } = useWalletProviders();

     const openAndCloseSideBar = () => {
       dispatch(toggleSidebar());
     };
     const onClick = () => {
       openAndCloseSideBar();
       if (!route) return;
       router.push(route);
     }
     if (isProtected) {
       if (!accounts || accounts.length === 0) {
         return <></>
       }
     }

     return <li onClick={onClick} className="p-4 text-lg text-white cursor-pointer" key={name + route}>
       {component ? component : name}
     </li>
   }