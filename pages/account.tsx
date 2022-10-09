import { Footer } from "../components/Footer";
import { MyAccount } from "../components/Landing/MyAccount";
import { NewsLetter } from "../components/Landing/NewsLetter";
import { ProtectedRoute } from "../layout/guard";

function Main() {



     return <>
          <MyAccount />
          <NewsLetter />
          <Footer />
     </>
}

export default ProtectedRoute(Main);