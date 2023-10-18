// projectSlice.js

import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'projects',
    initialState: { projects: [] },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        }
    }
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;

export const selectCurrentProjects = (state) => state.projects.projects;
