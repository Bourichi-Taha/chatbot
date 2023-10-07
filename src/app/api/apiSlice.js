import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://flasktest-vkre.onrender.com',
    baseUrl: 'http://127.0.0.1:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.access_token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})


export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User','Files','Messages','History'],
    endpoints: builder => ({})
})