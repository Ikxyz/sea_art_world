import Images from "../../assets/images";
import Utils from "../../modules/utils";
import CButton from "../Button";
import ConnectWalletButton from "../ConnectWalletButton";

export function Hero() {
     return <>
          <section id="hero" className="flex lg:pl-[135px] px-[30px] xl:grid-cols-2 xl:gap-y-0 flex-col  gap-y-28 text-white  max-w-screen overflow-x-hidden box-border   xl:flex-row  mt-[90px] ">
               <header className="w-full ">
                    <h1 className="text-[68px] font-bold capitalize lg:leading-2 leading-none">
                         Explore, Create<br />
                         & Sell your NFT
                    </h1>
                    <p className="text-[20px] capitalize  text-justify ">
                         Buy and sell NFTs and browse our small scale<br /> collection of digital art and collectibles by top<br /> artists from around the world.
                    </p>
                    <br />
                    <ConnectWalletButton />
               </header>
               <div className="  w-full  relative h-[600px]">
                    <div className="bg-hero_bg  absolute text-center w-[320px] border-gray-50 border-solid border-opacity-25 border-y-2 backdrop-blur-lg p-3   rounded-[40px] top-0">

                         <img src={Images.hero_art_1.src} className="w-[287px] mb-3" />
                         <p className="text-2xl">Bleeding Ghost</p>
                         <p className="text-lg">{Utils.toMoney(152_793.17)}</p>
                    </div>
                    <div className="bg-hero_bg  absolute text-center w-[276px] border-gray-50 border-solid border-opacity-25 border-y-2 backdrop-blur-lg p-3   rounded-[40px] top-[56px] left-[180px] z-10">

                         <img src={Images.hero_art_2.src} className="w-[247px] mb-3" />
                         <p className="text-2xl">Bleeding Ghost</p>
                         <p className="text-lg">{Utils.toMoney(152_793.17)}</p>
                    </div>
                    <div className="bg-hero_bg  absolute text-center w-[320px] border-gray-50 border-solid border-opacity-25 border-y-2 backdrop-blur-lg p-3   rounded-[40px] top-[156px] left-[348px]">

                         <img src={Images.hero_art_3.src} className="w-[287px] mb-3" />
                         <p className="text-2xl">Bleeding Ghost</p>
                         <p className="text-lg">{Utils.toMoney(152_793.17)}</p>
                    </div>
               </div>
          </section>
     </>
}