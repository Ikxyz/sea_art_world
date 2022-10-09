import { createApi } from '@reduxjs/toolkit/dist/query/react';
import EndPoints from '../constants/endpoints';
import BaseQuery from './base';
import ICurrencyRequest from '../@types/http/currency';


const Urls = EndPoints.Currency;

const CurrencyApi = createApi({
     reducerPath: "CurrencyApi",
     baseQuery: BaseQuery,
     refetchOnFocus: true,
     refetchOnReconnect: true,
     refetchOnMountOrArgChange: true,
     endpoints: (builder) => ({
          currencies: builder.query<ICurrencyRequest.Currencies.response, ICurrencyRequest.Currencies.request>({
               query: () => Urls.getCurrencies,

          }),
          currencyRate: builder.query<ICurrencyRequest.CurrencyRate.response, ICurrencyRequest.CurrencyRate.request>({ query: (currencyId) => Urls.getCurrencyRate + currencyId }),
          marketStatistics: builder.query<ICurrencyRequest.MarketStatices.response, ICurrencyRequest.MarketStatices.request>({ query: () => Urls.getMarketStatices })
     })
});



export const { useCurrenciesQuery, useCurrencyRateQuery, useMarketStatisticsQuery } = CurrencyApi;

export default CurrencyApi;
