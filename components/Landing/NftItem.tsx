import { useState } from "react";
import Images from "../../assets/images";
import { useWalletProviders } from "../../context/WalletProvider";
import { fAuth, FireBase } from "../../firebase/config";
import { IGallery, updateGalleryDoc } from "../../firebase/gallery";
import Utils from "../../modules/utils";
import { showNotification } from "../../plugins/toast_notification";
import CButton from "../Button";
import { useAccount } from "wagmi";

export default function NftItem({ nft }: { nft: IGallery }) {
     const { changeAmount, ethInUsd } = useWalletProviders();
const {address} = useAccount()
     const user = fAuth.currentUser;

     const [isLoading, setIsloading] = useState(false);
     const like = async () => {
          await updateGalleryDoc(nft.id, { likes: FireBase.firestore.FieldValue.increment(1) });
     }
     const buyNFT = async (gallery: IGallery) => {
          setIsloading(true);
          const user = fAuth.currentUser;
          if (!user) return;
          try {
               if ((await changeAmount((Number(gallery.amount) * ethInUsd).toString())) === false) throw { message: "Transaction failed" };
               await updateGalleryDoc(gallery.id, {
                    author: user.uid,
                    authorAddress: `${address}`
               });
          } catch (error) {
               showNotification((error as any)?.message ?? error);
          }
          setIsloading(false);

     }
     return <>
          <li key={nft.id} className="flex flex-col space-y-3 p-2 w-[276px] h-[389px] rounded-2xl  bg-wallet_bg relative">
               <div className="relative">
                    <img src={nft.url} className="rounded-2xl  w-full h-[183px] object-cover" width="260" height="183" alt="hero image 1" />
                    <div onClick={like} className="absolute cursor-pointer -top-0 right-0 w-[95px] h-[50px] flex items-center justify-center space-x-2 text-center rounded-bl-3xl backdrop-blur-md">
                         <img src={Images.favorite.src} className="rounded-2xl cursor-pointer  w-[16px] h-[16px] object-cover" width="16" height="16" alt="favorite" />
                         <p>{nft.likes}</p>
                    </div>
               </div>
               {/* <div className="flex flex-row px-5 space-x-4">
                    <img src={Images.user.src} className="rounded-[50%] w-[40px] h-[40px]" width="40" height="40" alt="profile picture" />
                    <div className="flex-grow">
                         <h3 className="text-2xl">{nft.name}</h3>
                         <p >By @{nft.author.substring(0, 8)}</p>
                    </div>
               </div> */}
               <div className="flex flex-row items-start content-start justify-start px-5 space-x-4 align-top">
                    <h6 className="min-w-max ">On Sale</h6>
                    <img src={Images.fire.src} className="w-[20px] h-[20px]  " width="20" height="20" alt="hot deal" />
                    <div className="flex-grow text-end">

                         <div className="flex flex-row items-center content-end justify-end flex-grow w-full text-xl ">
                              <img src={Images.eth_icon.src} className="w-[20px] h-[20px] " width="20" height="20" alt="hot deal" />

                              {nft.amount} ETH</div>
                         <p >({Utils.toMoney(Number(nft.amount) * ethInUsd)})</p>
                    </div>
               </div>
               <div className="px-5 ">
                    {nft.author === user?.uid ? <></> : <CButton isLoading={isLoading} text="Buy Now" onClick={() => buyNFT(nft)} outlined fullWidth />}

               </div>

          </li>
     </>
}
