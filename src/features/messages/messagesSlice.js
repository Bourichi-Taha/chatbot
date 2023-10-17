import {createSlice} from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name:'messages',
    initialState : {messages:[],selectedConversation:null,summary:""},
    reducers: {
        setMessages : (state,action) => {
            state.messages = action.payload
        },
        setConversation : (state,action) => {
            state.selectedConversation = action.payload;
        },
        setSummary : (state,action) => {
            state.summary = action.payload
        },
        updateMessages : (state,action) => {
            state.messages = action.payload
        }
    }
})

export const {setMessages,setConversation,setSummary,updateMessages} = messagesSlice.actions;

export default messagesSlice.reducer;

export const selectCurrentMessages = (state) => state.messages.messages
export const selectCurrentConversationId = (state) => state.messages.selectedConversation
export const selectCurrentSummary = (state) => state.messages.summary