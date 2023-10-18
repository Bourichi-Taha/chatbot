import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "http://127.0.0.1:8000/login/",
        method: "POST", 
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.token));  
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "http://127.0.0.1:8000/register/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
