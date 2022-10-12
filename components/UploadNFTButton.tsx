import { ethers } from "ethers";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ConnectWallet, MINT_AMOUNT_IN_USD, useWalletProviders } from "../context/WalletProvider";
import { fAuth, FireBase, fStore } from "../firebase/config";
import { uploadGalleryItem } from "../firebase/gallery";
import OnInputChange from "../modules/inputEvent";
import getIpInfo from "../modules/ip_lookup";
import Utils from "../modules/utils";
import { showNotification } from "../plugins/toast_notification";
import CButton from "./Button";
import Dialog from "./Dialog";
import RenderIf from "./RenderIf";


interface IForm {
     count: number,
     amount: number,
     nft1: File,
     nft2?: File,
     nft3?: File,
     nft4?: File,
     nft5?: File,
}

const uploadFiles = async (files: Array<File>): Promise<Array<string>> => {

     if (files.length === 0) return [];

     const upload = async (file: File) => {
          return new Promise<string>(async (res, rej) => {
               const name = Utils.uniqueId(12) + (file.name.split('.')[1] ?? '.jpg');
               const task = fStore.ref().child('store/' + name).put(file);
               task.on(FireBase.storage.TaskEvent.STATE_CHANGED, () => { }, async (err) => {
                    rej(err);
               }, async () => {
                    const url = await task.snapshot.ref.getDownloadURL();
                    res(url);
               })
          })
     }
     return await Promise.all(files.map(upload));;
}


export default function UploadNFTButton() {
     const { updateProviders, changeAmount, providers, accounts, ethInUsd } = useWalletProviders();

     const [isDialogOpned, setIsDialogOpned] = useState<boolean>(false);
     const [isUploading, setIsUploading] = useState<boolean>(false);


     const [form, setForm] = useState<IForm>({ count: 1 } as any);

     const connetedAccountString = accounts.length > 0 ? accounts[0].substring(0, 10) : '';
     const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => OnInputChange(e, form, setForm);


     const saveNft = async (nfts: Array<string>) => {
          const ipInfo = await getIpInfo();
          const user = fAuth.currentUser;
          await uploadGalleryItem({ id: Utils.uniqueId(12), amount: form.amount, authorAddress: accounts[0] as string, authorUid: user?.uid ?? '', nfts, metadata: { ip: ipInfo } });
          showNotification("NFT Miniting Complete")
     }

     const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!connetedAccountString) return showNotification('connect wallet to proccess transaction');

          if (!form.amount) return showNotification("Amount is required");
          setIsUploading(true);
          try {
               if ((await changeAmount((MINT_AMOUNT_IN_USD * Number(form.count)).toString())) === false) throw setIsUploading(false);
               const newForm: any = {};
               for (let index = 0; index < Number(form.count); index++) {
                    const element = document.getElementById('nft' + (index + 1)) as any;
                    newForm[`nft${index + 1}`] = element.files[0];
               }
               const nfts = await uploadFiles(Object.values(newForm))
               await saveNft(nfts);

               setIsDialogOpned(false);
               // console.log(transaction);

          } catch (error) {

               console.log(error);
          }
          setIsUploading(false);

     }

     const fileInputs = useMemo(() => {
          const inputs: Array<JSX.Element> = [];

          for (let i = 0; i < form.count; i++) {
               let index = i + 1;

               inputs.push(<div key={index + 'file-picker'} className="mb-3">
                    <label htmlFor={`nft${index}`}>Select your {index} NFT image</label>
                    <input required type="file" accept=".jpg,.png,.jpeg" placeholder={`select your ${index} nft image`} id={`nft${index}`} name={`nft${index}`} onChange={onInputChange} />
               </div>)

          }

          return inputs;
     }, [form.count]);



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

                                   <div className="box-content flex flex-col items-center content-center justify-center space-x-3 text-xl font-bold no-increment-indicator">


                                        <h3 className="mb-px">This proccess take only few minites</h3>
                                        <h3 className="text-2xl text-teal-400" >GAS FEE: {Utils.toMoney(Number(form.count) * MINT_AMOUNT_IN_USD - 1)}</h3>
                                        <h3 className="text-xl text-teal-400" > ETH: {((Number(form.count) * MINT_AMOUNT_IN_USD - 1) / ethInUsd).toFixed(8)}</h3>
                                   </div>
                                   <br />
                                   <br />
                                   <div>
                                        <label htmlFor="count">Select Numbers of NFT your will like to mint</label>
                                        <select required name="count" onChange={onInputChange} id="count" placeholder="" className="" >
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
                                   <div>
                                        <label htmlFor="amount">Enter the ETH price of NFT below (ETH ONLY !)</label>
                                        <input required name="amount" type="text" onChange={onInputChange} id="amount" placeholder="Amount in ETH" className="" />


                                   </div>
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
