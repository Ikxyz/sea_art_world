import Link from "next/link";
import Images from "../assets/images";

export function Footer() {
     return <>
          <footer className="lg:pl-[135px] min-w-full pl-[50px] py-[34px] relative bg-black text-xl text-[#96839B] ">
               <ul className="flex flex-col content-center justify-center space-y-16 lg:justify-around lg:flex-row lg:space-x-3 lg:space-y-0">
                    <li >
                         <header>
                              <img className="lg:w-[270px] w-[200px]" src={Images.logo_full.src} alt="logo" />
                              <br />

                              <p>
                                   SeaWorldArt is the world’s leading NFTs <br /> marketplace where you can discover,<br /> sell and bid NFTs and get rich
                              </p>
                              <br />
                              <div className="flex flex-row space-x-10 ">
                                   {/* <img className=" h-[26px]" src={Images.youtube.src} alt="youtube logo" />
                                   <img className=" h-[26px]" src={Images.twitter.src} alt="youtube logo" />
                                   <img className=" h-[26px]" src={Images.facebook.src} alt="youtube logo" />
                                   <img className=" h-[26px]" src={Images.google.src} alt="youtube logo" /> */}
                              </div>
                         </header>
                    </li>
                    {/* <li >
                         <h3 className="text-2xl font-extrabold text-white">About</h3>
                         <ul>
                              <li>About NFT</li>
                              <li>Live Auctions</li>
                              <li>NFT Blog</li>
                              <li>Activity</li>
                         </ul>
                    </li> */}
                    {/* <li >
                         <h3 className="text-2xl font-extrabold text-white">Support</h3>
                         <ul>
                              <li>Help $ Support</li>
                               <li>Item Details</li>
                              <li>Author Profile</li>
                              <li><Link href="/gallery"><a>Collection</a></Link></li>
                         </ul>
                    </li> */}
               </ul>
          </footer>
     </>
}