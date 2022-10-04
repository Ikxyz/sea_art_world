import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import EndPoints from "../constants/endpoints";
import { RootState } from "../store";


const BaseQuery = fetchBaseQuery({
    baseUrl: EndPoints.base, prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState)?.auth?.token;
        headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_X_ACCESS_TOKEN}`);
        if (token) {
            headers.set("x-access-token", token);
        } return headers;
    }
});

export default BaseQuery;