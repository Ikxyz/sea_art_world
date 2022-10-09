import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import EndPoints from "../constants/endpoints";
import IVoucherRequestBody from "../@types/http/voucher";
import BaseQuery from "./base";





const Urls = EndPoints.Voucher;



const VoucherApi = createApi({
    reducerPath: "VoucherApi",
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        initiateRedemption: builder.mutation<IVoucherRequestBody.InitiateRedemption.response, IVoucherRequestBody.InitiateRedemption.request>({
            query: (payload) => ({
                url: Urls.initiateRedemption,
                body: payload,
                method: 'post'
            }),
            invalidatesTags: [EndPoints.Transaction.transactions as any]
        }),

        completeRedemption: builder.mutation({
            query: (payload: IVoucherRequestBody.CompleteRedemption) => ({
                url: Urls.completeRedemption,
                body: payload
            })
        }),

        resendOtp: builder.mutation({
            query: (payload: IVoucherRequestBody.ResendOtp) => ({
                url: Urls.resendOtp,
                body: payload
            })
        }),

    })
});


export const { useInitiateRedemptionMutation } = VoucherApi;

export default VoucherApi;