import {createSlice} from "@reduxjs/toolkit";

const filesSlice = createSlice({
    name:'files',
    initialState : {files:[],uploadedFile:null},
    reducers: {
        setFiles : (state,action) => {
            state.files = action.payload
        },
        uploadFile : (state,action) => {
            state.uploadedFile = action.payload
        }
    }
})

export const {setFiles,uploadFile} = filesSlice.actions;

export default filesSlice.reducer;

export const selectCurrentFiles = (state) => state.files.files
export const selectCurrentUploadedFile = (state) => state.files.uploadedFile