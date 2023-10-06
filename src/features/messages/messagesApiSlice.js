import { apiSlice } from "../../app/api/apiSlice";
import { setMessages, setSummary } from "./messagesSlice";

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({
        getAllMessages : builder.query({
            query: (conversationId) => ({
                url:`/get_messages/${conversationId}`,
                method : 'GET',

            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    dispatch(setMessages(data.messages));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags:["Messages"]
        }),
        summarize : builder.mutation({
            query : (fileName) =>({
                url: `/summarize/${fileName}`,
                method: "GET",
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    dispatch(setSummary(data.response));
                } catch (error) {
                    console.log(error);
                }
            },
        })
    })
})

export const {useGetAllMessagesQuery} = messagesApiSlice
