import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from "../layout";
import store from '../store';
import "../styles/font.scss";
import "../styles/globals.scss";
import ToastNotification from '../plugins/toast_notification';
import Dialogs from '../components/Dialogs';
import WalletProvider from "../context/WalletProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WalletProvider  >
        <ToastNotification />
        <Dialogs />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>

    </Provider>
  );
}

export default MyApp
