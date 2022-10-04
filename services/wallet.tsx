import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import EndPoints from "../constants/endpoints";
import IWalletRequestBody from "../interfaces/http/wallet";
import BaseQuery from './base';
import { HttpStandardResponse } from '../interfaces/http/index';
import IWallet from '../interfaces/wallet';
import { RootState } from '../store/index';
import { setUserWallets, setUserWalletsBalances } from "../store/slices/wallet";



const Urls = EndPoints.Wallet;



const WalletApi = createApi({
    reducerPath: 'WalletApi',
    baseQuery: BaseQuery,
    tagTypes: [Urls.history, Urls.nairaBalance, Urls.balances, Urls.base],
    endpoints: (builder) => ({
        createWallet: builder.mutation<IWalletRequestBody.Create.response, IWalletRequestBody.Create.request>({
            query: (payload) => ({ url: Urls.create, body: payload, method: 'post' }),
            invalidatesTags: [Urls.nairaBalance, Urls.balances, Urls.base],
        }),
        wallets: builder.query<IWalletRequestBody.Wallets.response, IWalletRequestBody.Wallets.request>({
            query: () => Urls.base,
            providesTags: [Urls.base],

            transformResponse: (response: IWalletRequestBody.Wallets.response, meta: any, arg: any) => {
                response.data = response.data!.map((wallet) => {
                    wallet.logoUrl = "";
                    return wallet;
                });
                return response;
            },
            onCacheEntryAdded: async (arg, { dispatch, getState, getCacheEntry, cacheDataLoaded }) => {
                await cacheDataLoaded;
                const { data, isSuccess } = getCacheEntry();
                if (isSuccess) {
                    dispatch(setUserWallets(data.data));
                }
            }
        }),
        nairaBalance: builder.query<IWalletRequestBody.NairaBalance.response, IWalletRequestBody.NairaBalance.request>({
            query: () => Urls.nairaBalance,
            providesTags: [Urls.nairaBalance]
        }),
        balances: builder.query<IWalletRequestBody.Balances.response, IWalletRequestBody.Balances.request>({
            query: () => Urls.balances,
            providesTags: [Urls.balances],

            onCacheEntryAdded: async (arg, { dispatch, getState, getCacheEntry, cacheDataLoaded }) => {
                await cacheDataLoaded;
                const { data, isSuccess } = getCacheEntry();
                if (isSuccess) {
                    dispatch(setUserWalletsBalances(data.data));
                }
            }
        }),
        balance: builder.query<IWalletRequestBody.Balance.response, IWalletRequestBody.Balance.request>({
            query: (walletId) => Urls.balance + walletId,
            providesTags: [Urls.balance]
        }),
        history: builder.query<IWalletRequestBody.History.response, IWalletRequestBody.History.request>({
            query: (walletId) => Urls.history + walletId,
            providesTags: [Urls.history]
        }),
    }),
});

export const { useBalanceQuery, useBalancesQuery, useCreateWalletMutation, useHistoryQuery, useNairaBalanceQuery, useWalletsQuery } = WalletApi;

export default WalletApi;
