import { apiSlice } from "../../app/api/apiSlice";
import { setConversation, setMessages, setSummary } from "./messagesSlice";

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({
        getAllMessages : builder.query({
            query: (conversationId) => ({
                url:`/conversation-messages/${conversationId}/`,
                method : 'GET',

            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    dispatch(setMessages(data));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags:["Messages"]
        }),
        summarize : builder.mutation({
            query : (fileName) =>({
                url: `/summarize/${fileName}/`,
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
        }),
        sendMessage : builder.mutation({
            query : (formData) =>({
                url: "/chat/",
                method: "POST",
                body:formData
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    dispatch(setConversation(data.conv_id));
                    // dispatch(setSummary(data.response));
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags:["Messages","History"]
        }),
    })
})

export const {useGetAllMessagesQuery,useSummarizeMutation,useSendMessageMutation} = messagesApiSlice
