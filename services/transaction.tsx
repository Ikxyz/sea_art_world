import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import EndPoints from "../constants/endpoints";
import ITransactionRequestBody from "../@types/http/transaction";
import BaseQuery from "./base";

const Urls = EndPoints.Transaction;

const TransactionApi = createApi({
  reducerPath: "TransactionApi",
  baseQuery: BaseQuery,
  tagTypes: [Urls.transactions, EndPoints.Wallet.history, EndPoints.Wallet.nairaBalance, EndPoints.Wallet.balances, EndPoints.Wallet.base],
  endpoints: (builder) => ({
    depositCallback: builder.mutation({
      query: (payload: ITransactionRequestBody.DepositCallback) => ({
        url: Urls.depositCallback,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    depositLink: builder.mutation<ITransactionRequestBody.DepositLink.response, ITransactionRequestBody.DepositLink.request>({
      query: (payload) => ({
        url: Urls.depositLink,
        body: payload,
        method: 'post'
      }),
    }),
    initiateDeposit: builder.mutation<ITransactionRequestBody.InitiateDeposit.response, ITransactionRequestBody.InitiateDeposit.request>({
      query: (payload) => ({
        url: Urls.initiateDeposit,
        body: payload,
        method: 'post'
      }),
    }),
    completeDeposit: builder.mutation<ITransactionRequestBody.CompleteDeposit.response, ITransactionRequestBody.CompleteDeposit.request>({
      query: (payload) => ({
        url: Urls.completeDeposit,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions, EndPoints.Wallet.history, EndPoints.Wallet.nairaBalance, EndPoints.Wallet.balances, EndPoints.Wallet.base]
    }),
    initiateWithdrawal: builder.mutation({
      query: (payload: ITransactionRequestBody.InitiateWithdrawal) => ({
        url: Urls.initiateWithdrawal,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    completeWithdrawal: builder.mutation<ITransactionRequestBody.CompleteWithdrawal.response, ITransactionRequestBody.CompleteWithdrawal.request>({
      query: (payload) => ({
        url: Urls.completeWithdrawal,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    withdrawalResendOtp: builder.mutation({
      query: (payload: ITransactionRequestBody.WithdrawalResendOtp) => ({
        url: Urls.withdrawalResendOtp + payload.reference,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    internalSell: builder.mutation<ITransactionRequestBody.InternalSell.response, ITransactionRequestBody.InternalSell.request>({
      query: (payload) => ({
        url: Urls.internalSell,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions, EndPoints.Wallet.history, EndPoints.Wallet.nairaBalance, EndPoints.Wallet.balances, EndPoints.Wallet.base]
    }),
    externalSell: builder.mutation({
      query: (payload: ITransactionRequestBody.ExternalSell) => ({
        url: Urls.externalSell,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    internalBuy: builder.mutation<ITransactionRequestBody.InternalBuy.response, ITransactionRequestBody.InternalBuy.request>({
      query: (payload) => ({
        url: Urls.internalBuy,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions, EndPoints.Wallet.history, EndPoints.Wallet.nairaBalance, EndPoints.Wallet.balances, EndPoints.Wallet.base]
    }),
    externalBuy: builder.mutation({
      query: (payload: ITransactionRequestBody.ExternalBuy) => ({
        url: Urls.externalBuy,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    coinTransfer: builder.mutation({
      query: (payload: ITransactionRequestBody.CoinTransfer) => ({
        url: Urls.coinTransfer,
        body: payload,
        method: 'post',
      }),
      invalidatesTags: [Urls.transactions]
    }),
    transactions: builder.query<ITransactionRequestBody.Transactions.response, ITransactionRequestBody.Transactions.request>({
      query: (payload) => Urls.transactions,
      providesTags: [Urls.transactions]
    }),
  }),
});


export const { useDepositLinkMutation, useInitiateDepositMutation, useCompleteDepositMutation, useInitiateWithdrawalMutation, useCompleteWithdrawalMutation, useWithdrawalResendOtpMutation, useInternalSellMutation, useExternalSellMutation, useInternalBuyMutation, useExternalBuyMutation, useCoinTransferMutation, useTransactionsQuery } = TransactionApi;

export default TransactionApi;