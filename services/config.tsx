import { createApi } from "@reduxjs/toolkit/dist/query/react";
import BaseQuery from "./base";
import EndPoints from '../constants/endpoints';
import IConfigRequest from "../@types/http/config";


const Urls = EndPoints.Config;

const ConfigApi = createApi({
     reducerPath:"ConfigApi",
     baseQuery: BaseQuery,
     tagTypes: [Urls.transactionSettings],
     endpoints: (builder) => ({
          getTransactionsConfig: builder.query<IConfigRequest.TransactionSettings.response, IConfigRequest.TransactionSettings.request>({
               query: () => Urls.transactionSettings,
               providesTags: [Urls.transactionSettings]
          })
     })
});


export const { useGetTransactionsConfigQuery } = ConfigApi;

export default ConfigApi;