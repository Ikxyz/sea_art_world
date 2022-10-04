import IWallet from '../../interfaces/wallet';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICurrency from '../../interfaces/currency';


interface IState {
     currencies: Array<ICurrency>,
     wallets: Array<IWallet>,
}

const initialState: IState = { currencies: [], wallets: [] }

const WalletSlice = createSlice({
     name: "wallet",
     initialState,
     reducers: {
          setCurrencies: (state, action: PayloadAction<Array<ICurrency>>) => {
               state.currencies = action.payload;
          },
          setUserWallets: (state, action: PayloadAction<Array<IWallet>>) => {
               const wallets = action.payload;
               state.wallets = wallets.map((wallet) => {
                    const logoUrl = state.currencies.find((currency) => currency.code.toLowerCase() === wallet.currencyCode.toLowerCase())?.logoUrl ?? '';
                    return { ...wallet, logoUrl };
               });
          },
          setUserWalletsBalances: (state, action: PayloadAction<Array<IWallet>>) => {
               const wallets = action.payload;
               console.log(wallets);
               state.wallets = state.wallets.map((wallet) => {
                    const balance = wallets.find((e) => {

                         return e.currencyCode.toLowerCase() === wallet.currencyCode.toLowerCase()

                    })?.balance ?? 0;
                    return { ...wallet, balance };
               });
          }
     }
});

export const { setUserWallets, setCurrencies, setUserWalletsBalances } = WalletSlice.actions;

export default WalletSlice.reducer;
