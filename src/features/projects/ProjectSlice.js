import {createSlice} from "@reduxjs/toolkit";

const ProjectSlice = createSlice({
    name:'projects',
    initialState : {projects:[],message:""},
    reducers: {
        getUserProjects : (state,action) => {
            state.projects = action.payload;
        }
    }
})

export const {getUserProjects} = ProjectSlice.actions;

export default ProjectSlice.reducer;

export const selectCurrentProjects = (state) => state.projects.projects