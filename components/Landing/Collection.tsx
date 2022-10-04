import Images from "../../assets/images";


const Wallets: Array<{ wallet: string, image: string }> = [
     { wallet: 'hero image 1', image: Images.hero_art_1.src },
     { wallet: 'hero image 2', image: Images.hero_art_2.src },
     { wallet: 'hero image 3', image: Images.hero_art_3.src },
     { wallet: 'hero image 4', image: Images.hero_art_4.src },
     { wallet: 'hero image 5', image: Images.hero_art_5.src },
     { wallet: 'hero image 6', image: Images.hero_art_6.src },
     { wallet: 'hero image 7', image: Images.hero_art_7.src }
]


export function Collection() {
     return <>
          <section className="relative w-full text-white  mt-[140px]">
               <header className="flex flex-col items-center w-full ">
                    <h1 className="text-xl font-light text-transparent capitalize w-fit bg-gradient-to-r from-white to-secodary bg-clip-text">Explore our newly released NFT collection </h1>
                    <p className="text-5xl capitalize">Our collection</p>
               </header>
               <ul className="relative flex content-around justify-around max-w-full mt-12 space-x-3 overflow-x-auto scroll-m-5 ">
                    <img src={Images.hero_art_9.src} className="relative left-[330px] top-20 w-[184px] h-[245px] " width="82" alt="hero image 1" />
                    <img src={Images.hero_art_7.src} className="relative left-[215px] top-16 w-[233px] h-[310px]  " width="82" alt="hero image 2" />
                    <img src={Images.hero_art_6.src} className="relative left-[100px] top-10 w-[284px] h-[379px]" width="82" alt="hero image 3" />
                    <img src={Images.hero_art_4.src} className="z-40 w-[333px] h-[445px]" width="82" alt="hero image 4" />
                    <img src={Images.hero_art_5.src} className="relative  z-30 right-[100px] top-10   w-[284px] h-[379px]" width="82" alt="hero image 5" />
                    <img src={Images.hero_art_8.src} className="relative z-20 right-[215px] top-16  w-[233px] h-[310px]" width="82" alt="hero image 6" />
                    <img src={Images.hero_art_3.src} className="relative z-10 right-[330px] top-20   w-[184px] h-[245px]" width="82" alt="hero image 7" />
               </ul>
          </section>
     </>
}
