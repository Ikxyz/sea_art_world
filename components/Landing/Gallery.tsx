import { useEffect, useState } from "react"
import Images from "../../assets/images"
import { useWalletProviders } from "../../context/WalletProvider"
import { fAuth } from "../../firebase/config"
import { fetchGalley, fetchGalleySnapshot, IGallery, updateGalleryDoc, uploadGalleryItem } from "../../firebase/gallery"
import Utils from "../../modules/utils"
import { showNotification } from "../../plugins/toast_notification"
import CButton from "../Button";
import NftItem from "./NftItem"

export interface INFT {
     id: string, timestamp: number, wallet: string, image: string, likes: number, name: string, author: string, amount: number, amountInUsd: number, authorImg: string, quatity: number
}


export function Gallery() {

     const { changeAmount } = useWalletProviders();
     const [nfts, setNFTs] = useState<Array<IGallery>>([]);

     useEffect(() => {
          const loadGallery = () => {
               const snapshot = fetchGalleySnapshot(50).onSnapshot((docs) => {
                    const data = docs.docs.map((e) => e.data() as IGallery).map((e) => ({ ...e, timestamp: Utils.generateNumber().code })).sort();
                    setNFTs(data);
               });
               return snapshot;
          }
          const snapshot = loadGallery();
          return () => snapshot();
     }, []);



     return <>
          <section className="relative w-full text-white lg:pl-[135px] lg:pr-[20px]  pr-30px mt-[140px]">
               <header className="flex lg:pl-[135px] px-[30px] flex-row items-center content-center justify-center w-full p-3 ">
                    <div className="text-center w-fit">
                         <h1 className="text-sm font-light text-transparent capitalize w-fit bg-gradient-to-r from-white to-secodary bg-clip-text">Explore our newly released NFT collection </h1>
                         <p className="text-2xl capitalize lg:text-5xl">Explore Our nFTs </p>
                    </div>
               </header>
               <ul className="relative grid max-w-full grid-cols-1 mt-12 space-x-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-content-around place-items-center gap-x-3 gap-y-8">
                    {nfts.map((e) => <NftItem nft={e} key={'nft-item' + e.id} />)}

               </ul>
          </section>
     </>
}
