import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import EndPoints from "../constants/endpoints";
import IAccountRequestEndpoint from "../@types/http/account";


const Urls = EndPoints.Account;

const AccountApi = createApi({
    reducerPath: 'AccountAPi',
    baseQuery: fetchBaseQuery({ baseUrl: Urls.base }),
    endpoints: (builder) => ({
        beneficiary: builder.mutation({
            query: (payload: IAccountRequestEndpoint.Beneficiary) => ({
                url: Urls.Beneficiary,
                body: payload,
                method: 'post'
            })
        }),
        deleteBeneficiary: builder.mutation({
            query: (payload: IAccountRequestEndpoint.DeleteBeneficiary) => ({
                url: Urls.Beneficiary + '/' + payload.beneficiaryId,
                body: payload,
                method: 'delete'
            })
        }),
        verify: builder.mutation({
            query: (payload: IAccountRequestEndpoint.Verify) => ({
                url: Urls.Verify,
                body: payload,
                method: 'post'
            })
        }),
        beneficiaries: builder.mutation({
            query: (payload: IAccountRequestEndpoint.Beneficiaries) => ({
                url: Urls.Beneficiaries,
                body: payload,
                method: 'get'
            })
        }),
        bankList: builder.mutation({
            query: (payload: IAccountRequestEndpoint.BankList) => ({
                url: Urls.BankList,
                body: payload,
                method: 'get'
            })
        }),
    })
})


export default AccountApi;