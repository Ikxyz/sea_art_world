import Images from "../../assets/images"
import Utils from "../../modules/utils"
import CButton from "../Button"

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
     return <>
          <section className="relative w-full text-white lg:pl-[135px] lg:pr-[20px]  pr-30px mt-[140px]">
               <header className="flex flex-row items-center content-center justify-between w-full p-3 ">
                    <div>
                         <h1 className="text-sm font-light text-transparent capitalize w-fit bg-gradient-to-r from-white to-secodary bg-clip-text">Explore our newly released NFT collection </h1>
                         <p className="text-2xl capitalize lg:text-5xl">hot trending nFTs </p>
                    </div>
                    <CButton text="View All" />
               </header>
               <ul className="relative grid max-w-full grid-cols-1 mt-12 space-x-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-content-around place-items-center gap-x-3 gap-y-8">
                    {NFTs.map((e) => <li key={e.id} className="flex flex-col space-y-3 p-2 w-[276px] h-[389px] rounded-2xl  bg-wallet_bg relative">
                         <div className="relative">
                              <img src={e.image} className="rounded-2xl  w-full h-[183px] object-cover" width="260" height="183" alt="hero image 1" />
                              <div className="absolute -top-0 right-0 w-[95px] h-[50px] flex items-center justify-center space-x-2 text-center rounded-bl-3xl backdrop-blur-md">

                                   <img src={Images.favorite.src} className="rounded-2xl  w-[16px] h-[16px] object-cover" width="16" height="16" alt="favorite" />
                                   <p>{e.likes}</p>
                              </div>
                         </div>
                         <div className="flex flex-row px-5 space-x-4">
                              <img src={Images.user.src} className="rounded-[50%] w-[40px] h-[40px]" width="40" height="40" alt="profile picture" />
                              <div className="flex-grow">
                                   <h3 className="text-2xl">{e.name}</h3>
                                   <p >By @{e.author}</p>
                              </div>
                         </div>
                         <div className="flex flex-row items-start content-between justify-between px-5 space-x-4">
                              <h6 className="min-w-max ">On Sale</h6>
                              <img src={Images.fire.src} className="w-[20px] h-[20px] mt-1" width="20" height="20" alt="hot deal" />
                              <div className="flex-grow text-end">

                                   <div className="flex flex-row items-center content-end justify-end flex-grow w-full text-xl ">
                                        <img src={Images.eth_icon.src} className="w-[20px] h-[20px] " width="20" height="20" alt="hot deal" />

                                        {e.amount} ETH</div>
                                   <p >({Utils.toMoney(e.amountInUsd)})</p>
                              </div>
                         </div>
                         <div className="px-5 ">
                              <CButton text="Buy Now" outlined fullWidth />

                         </div>

                    </li>)}

               </ul>
          </section>
     </>
}
