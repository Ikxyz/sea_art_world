import { Footer } from "../components/Footer";
import { Collection } from "../components/Landing/Collection";
import { Hero } from "../components/Landing/Hero";
import { NewsLetter } from "../components/Landing/NewsLetter";
import { Trending } from "../components/Landing/Trending";
import { WalletSupport } from "../components/Landing/WalletSupport";
import { ProtectedRoute } from "../layout/guard";

function Main() {



     return <>
          <Trending />
          <NewsLetter />
          <Footer />
     </>
}

export default ProtectedRoute(Main);