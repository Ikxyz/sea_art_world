import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import EndPoints from '../constants/endpoints';
import ILocationRequestBody from '../@types/http/location';


const Urls = EndPoints.Location;

const LocationApi = createApi({
    reducerPath: 'LocationApi',
    baseQuery: fetchBaseQuery({ baseUrl: Urls.base }),
    endpoints: (builder) => ({
        states: builder.mutation({
            query: () => ({
                url: Urls.states
            })
        }),
        lga: builder.mutation({
            query: (payload: ILocationRequestBody.LGA) => ({
                url: Urls.lga + '/' + payload.stateId
            })
        })
    })
});


export default LocationApi;
