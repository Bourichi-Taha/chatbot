import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
                
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const data = await queryFulfilled;
                    return data
                } catch (error) {
                    console.log(error)
                }
            }
        }) ,
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        sendLogout : builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    await queryFulfilled

                    dispatch(logOut());
                    dispatch(apiSlice.util.resetApiState());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })
})

export const {useLoginMutation,useSendLogoutMutation,useRefreshMutation,useRegisterQuery} = authApiSlice