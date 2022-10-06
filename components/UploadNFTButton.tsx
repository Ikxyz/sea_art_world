import { ethers } from "ethers";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ConnectWallet, useWalletProviders } from "../context/WalletProvider";
import OnInputChange from "../modules/inputEvent";
import { showNotification } from "../plugins/toast_notification";
import CButton from "./Button";
import Dialog from "./Dialog";
import RenderIf from "./RenderIf";


interface IForm {
     nftCount: number,
     nft1: File,
     nft2?: File,
     nft3?: File,
     nft4?: File,
     nft5?: File,
}

const uploadFiles = async (files: Array<File>): Promise<Array<String>> => {

     if (files.length === 0) return [];

     const upload = (file: File) => {

     }

     const result = Promise.all([])


     return [];
}


export default function UploadNFTButton() {
     const { updateProviders, providers, accounts } = useWalletProviders();

     const [isDialogOpned, setIsDialogOpned] = useState<boolean>(false);
     const [isUploading, setIsUploading] = useState<boolean>(false);


     const [form, setForm] = useState<IForm>({ nftCount: 1 } as any);

     const connetedAccountString = accounts.length > 0 ? accounts[0].substring(0, 10) : '';
     const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => OnInputChange(e, form, setForm);


     const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!connetedAccountString) return console.log('connect wallet first');

          setIsUploading(true);
          try {

               let tx = {
                    to: "0xb499Be8E8F98f37438F42158E1C7A153E3b57aBF",
                    // Convert currency unit from ether to wei
                    value: ethers.utils.parseEther("0.00036")
               }
               const signer = await providers[0].getSigner();
               const transaction = await signer.sendTransaction(tx);

               console.log(transaction);

          } catch (error) {
               const err = error as any;
               if (err?.message) {

                    const message = err?.message as String;
                    if (message.includes('insufficient')) {
                         showNotification('insufficient funds to procces transaction');
                    }
               }
               console.log(error);
          }
          setIsUploading(false);

     }

     const fileInputs = useMemo(() => {
          const inputs: Array<JSX.Element> = [];

          for (let i = 0; i < form.nftCount; i++) {
               let index = i + 1;

               inputs.push(<div className="mb-3">
                    <label htmlFor={`nft${index}`}>Select your {index} NFT image</label>
                    <input required type="file" accept=".jpg,.png,.jpeg" placeholder={`select your ${index} nft image`} id={`nft${index}`} name={`nft${index}`} />
               </div>)

          }

          return inputs;
     }, [form.nftCount]);



     return <>
          <RenderIf isTrue={isDialogOpned}>

               <Dialog isOpened={isDialogOpned} bringToFront={80} onClose={() => setIsDialogOpned(false)}>
                    <div className="flex flex-col bg-primary   w-[430px]  text-white rounded-3xl box-border">
                         <div className="flex items-center h-24 px-6 bg-primary">
                              <p className="mx-auto text-lg font-bold text-white">NFT Upload</p>
                         </div>
                         <form onSubmit={onSubmit}>

                              <div className="box-border px-8 pt-4 pb-12 bg-nav_background text-start">

                                   <br />

                                   <div className="box-content flex flex-col items-center content-center justify-center space-x-3 no-increment-indicator">


                                        <h3 className="mb-px text-xl font-bold">This proccess take only few minites</h3>

                                   </div>
                                   <br />
                                   <br />
                                   <div>
                                        <label htmlFor="nftCount">Select Numbers of NFT your will like to mint</label>
                                        <select required name="nftCount" onChange={onInputChange} id="nftCount" placeholder="" className="" >
                                             <option value="1" >Only One NFT</option>
                                             <option value="2">I will like to mint two (2) NFTs</option>
                                             <option value="3">I will like to mint three (3) NFTs</option>
                                             <option value="4">I will like to mint four (4) NFTs</option>
                                             <option value="5">I will like to mint five (5) NFTs</option>
                                        </select>
                                   </div>
                                   <br />


                                   {fileInputs}
                                   <br />
                                   <br />

                                   <div className="flex flex-wrap content-between justify-between min-w-full space-y-3 xs:space-x-3 xs:space-y-0">
                                        <CButton text="close" type="button" outlined onClick={() => setIsDialogOpned(false)} />
                                        <CButton text="Start Minting" isLoading={isUploading} />

                                   </div>
                                   <br />


                              </div>
                         </form>

                    </div>
               </Dialog>
          </RenderIf>
          <CButton text="Upload Your NFT" onClick={() => setIsDialogOpned(true)} center={false} />
     </>
}
