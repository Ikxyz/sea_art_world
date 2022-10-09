import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import EndPoints from "../constants/endpoints";
import IOtpRequestBody from '../@types/http/otp';
import BaseQuery from "./base";




const Urls = EndPoints.Otp;

const OtpApi = createApi({
    reducerPath: 'OtpApi',
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        sendOtp: builder.mutation<IOtpRequestBody.Send.response, IOtpRequestBody.Send.request>({
            query: (payload) => ({ url: Urls.send, body: payload, method: "post" })
        }),
        verifyOtp: builder.mutation<IOtpRequestBody.Verify.response, IOtpRequestBody.Verify.request>({
            query: (payload) => ({ url: Urls.verify, body: payload, method: "post" })
        })
    })
})


export const { useSendOtpMutation, useVerifyOtpMutation } = OtpApi;

export default OtpApi;
