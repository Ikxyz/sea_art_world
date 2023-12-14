import { useRouter } from "next/router"
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

const NFTs: Array<INFT> = [
     { id: '1', timestamp: 0, wallet: 'hero image 1', image: Images.hero_art_1.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '2', timestamp: 0, wallet: 'hero image 2', image: Images.hero_art_2.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '3', timestamp: 0, wallet: 'hero image 3', image: Images.hero_art_3.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '4', timestamp: 0, wallet: 'hero image 4', image: Images.hero_art_4.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '5', timestamp: 0, wallet: 'hero image 5', image: Images.hero_art_5.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '6', timestamp: 0, wallet: 'hero image 6', image: Images.hero_art_6.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '7', timestamp: 0, wallet: 'hero image 7', image: Images.hero_art_7.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },
     { id: '8', timestamp: 0, wallet: 'hero image 8', image: Images.hero_art_8.src, amount: 4.89, amountInUsd: 654_874.86, author: 'JSmith', authorImg: Images.user.src, likes: 341, name: 'Monkey ape', quatity: 5 },

]
export function Trending() {

     const { changeAmount } = useWalletProviders();
     const [nfts, setNFTs] = useState<Array<IGallery>>([]);
     const router = useRouter();

     const viewAll = () => {
          router.push('/gallery');
     }
     useEffect(() => {
          const loadGallery = () => {
               const snapshot = fetchGalleySnapshot().onSnapshot((docs) => {
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
               <header className="flex flex-row items-center content-center justify-between w-full p-3 ">
                    <div>
                         <h1 className="text-sm font-light text-transparent capitalize w-fit bg-gradient-to-r from-white to-secodary bg-clip-text">Explore our newly released NFT collection </h1>
                         <p className="text-2xl capitalize lg:text-5xl">hot trending nFTs </p>
                    </div>
                    <CButton onClick={viewAll} text="View More" />
               </header>
               <ul className="relative grid max-w-full grid-cols-1 mt-12 space-x-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-content-around place-items-center gap-x-3 gap-y-8">
                    {nfts.map((e) => <NftItem nft={e} key={'nft-item' + e.id} />)}

               </ul>
          </section>
     </>
}
