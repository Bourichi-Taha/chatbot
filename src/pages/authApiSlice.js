import { setCredentials } from "./authSlice";
import { apiSlice } from './../app/api/apiSlice';

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
          console.log("Token before dispatch:", data.token);
          dispatch(setCredentials(data.token));  // this should now store the token as a string
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
