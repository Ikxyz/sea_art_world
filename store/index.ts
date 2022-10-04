import { configureStore } from "@reduxjs/toolkit";
import AuthApi from "../services/auth";
import ConfigApi from "../services/config";
import OtpApi from "../services/otp";

import authReducer from "./slices/auth";
import onDialogsReducer from "./slices/dialogs";
import navigationReducer from "./slices/navigation";
import onBoardingReducer from "./slices/onboarding";
import CurrencyApi from '../services/currency';
import WalletApi from '../services/wallet';
import walletReducer from "./slices/wallet";
import TransactionApi from '../services/transaction';

const store = configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        onBoarding: onBoardingReducer,
        dialogs: onDialogsReducer,
        wallet: walletReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [ConfigApi.reducerPath]: ConfigApi.reducer,
        [CurrencyApi.reducerPath]: CurrencyApi.reducer,
        [OtpApi.reducerPath]: OtpApi.reducer,
        [WalletApi.reducerPath]: WalletApi.reducer,
        [TransactionApi.reducerPath]: TransactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware).concat(ConfigApi.middleware).concat(CurrencyApi.middleware).concat(OtpApi.middleware).concat(WalletApi.middleware).concat(TransactionApi.middleware),

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;