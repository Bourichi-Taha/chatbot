import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import historyReducer from "../features/history/historySlice";
import messagesReducer from "../features/messages/messagesSlice";
import filesReducer from "../features/files/filesSlice";
import projectReducer from "../features/projects/ProjectSlice";
import projectApiReducer from "../features/projectsApi/projectSlice";
import { projectApiSlice } from "../features/projectsApi/projectApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    history: historyReducer,
    messages: messagesReducer,
    files: filesReducer,
    projects: projectReducer,
    projectApi: projectApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(apiSlice.middleware)
      .concat(projectApiSlice.middleware),
  devTools: true,
});
