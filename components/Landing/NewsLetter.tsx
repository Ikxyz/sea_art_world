import Images from "../../assets/images";

export function NewsLetter() {
     return <>
          <section id="new-letters" className={` h-[440px] relative bg-gradient-to-tr mt-[120px] p-5 from-fuchsia-900 via-transparent backdrop-blur-3xl flex flex-col items-center justify-center content-center`}>
               <header>
                    <h1 className="text-[36px] text-center text-white font-extrabold lg:text-[50px]">Ready for Next NFT Drop?</h1>
                    <br />
                    <div className="flex flex-row p-1  border-[1px] border-solid border-secodary rounded-2xl">
                         <input className="font-bold text-gray-300 bg-transparent" type="email" placeholder="info@gmail.com" />
                         <div className="w-[70px] h-[60px] p-2 bg-secodary rounded-xl flex items-center justify-center">
                              <img src={Images.arrow.src} alt="forward button" />
                         </div>
                    </div>
               </header>
               <img className="absolute top-0 object-cover w-full h-full -z-10" src={Images.pic.src} alt="background image" />
          </section>
     </>
}