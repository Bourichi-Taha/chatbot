import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import historyReducer from '../features/history/historySlice';
import messagesReducer from '../features/messages/messagesSlice';
import filesReducer from '../features/files/filesSlice';
import projectReducer from '../features/projects/ProjectSlice';
import libraryReducer from '../features/Library/LibrarySlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        history:historyReducer,
        messages:messagesReducer,
        files:filesReducer,
        projects:projectReducer,
        library:libraryReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
})