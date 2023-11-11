import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './BaseURL';


const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://flasktest-vkre.onrender.com',
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.access_token ;
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyODg4MDk3LCJpYXQiOjE2OTc3MDQwOTcsImp0aSI6IjhiNzY5OGYxZTNjMjQ4ZDc5YjNiYTU1OGE1Y2I3ZTU2IiwidXNlcmlkIjoxfQ.X9_7Q6SaH_ZZdkcK7NKF6EdpsgtaZNexy1V41uKbkH8";
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            headers.set("Bypass-Tunnel-Reminder", `1`);
        }
        return headers;
    }
})


export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User','Files','Messages','History','Projects','Library'],
    endpoints: builder => ({})
})