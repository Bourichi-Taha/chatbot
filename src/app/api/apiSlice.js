import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://flasktest-vkre.onrender.com',
    baseUrl: 'https://eac0-196-65-238-240.ngrok-free.app',
    prepareHeaders: (headers, { getState }) => {
        // const token = getState().auth.access_token;
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3MjE4ODM4LCJpYXQiOjE2OTcyMTUyMzgsImp0aSI6IjBhZGI0NzQ4YTQ5ZDQ2YTg5M2MyMzc0NWZhMWE3ZWY1IiwidXNlcmlkIjoxfQ.aNJyHtl0zRFgxvPHdFL8CuXSuGZJAbw71zZSeacr48E";
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})


export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User','Files','Messages','History','Projects'],
    endpoints: builder => ({})
})