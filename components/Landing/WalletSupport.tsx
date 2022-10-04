import Images from "../../assets/images";


const Wallets: Array<{ wallet: string, image: string }> = [
     { wallet: 'Metamask', image: Images.meta_mask.src },
     { wallet: 'Binance', image: Images.binance.src },
     { wallet: 'Trust Wallet', image: Images.trust_wallet.src },
     { wallet: 'Alpha', image: Images.alpha.src },
     { wallet: 'CoinGecko', image: Images.coin_gecko.src },
     { wallet: 'Metamask1', image: Images.meta_mask.src },
     { wallet: 'Binance2', image: Images.binance.src },
     { wallet: 'Trust Wallet3', image: Images.trust_wallet.src },
     { wallet: 'Alpha4', image: Images.alpha.src },
     { wallet: 'CoinGecko5', image: Images.coin_gecko.src }
]


export function WalletSupport() {
     return <>
          <section className={`relative w-full text-white box-border  mt-[140px] `}>
               <img className="absolute left-0 -top-[100%] " src={Images.background.src} alt="wallet background image" />

               <header className="flex flex-col items-center w-full ">
                    <h1 className="text-sm font-light text-transparent capitalize lg:text-xl w-fit bg-gradient-to-r from-white to-secodary bg-clip-text">Trade Wtih World&#39;s Most Trusted And Fastest Wallets</h1>
                    <p className="text-4xl capitalize lg:text-5xl">Wallet We Support</p>
               </header>
               <ul className="flex content-around justify-around max-w-full mt-12 space-x-3 overflow-scroll ">
                    {Wallets.map((e) => <li key={e.wallet} className="min-w-[198px] min-h-[243px]  hover:bg-opacity-10 bg-wallet_bg  bg-opacity-10 text-center rounded-2xl  p-6">
                         <div className="bg-wallet_bg w-fit p-8 rounded-[50%]">
                              <img src={e.image} className="mx-auto" width="82" alt="trust wallet" />
                         </div>
                         <br />
                         <p className="text-xl">{e.wallet}</p>
                    </li>)}
               </ul>

          </section>
     </>
}