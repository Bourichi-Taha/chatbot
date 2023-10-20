import {createSlice} from "@reduxjs/toolkit";

const LibrarySlice = createSlice({
    name:'library',
    initialState : {library:[],isFiltered:false,filteredLibrary:[],message:""},
    reducers: {
        getLibraryProjects : (state,action) => {
            state.library = action.payload;
        },
        getLibraryFiltered : (state,action) => {
            state.filteredLibrary = action.payload;
        },
        toggleIsFiltered : (state,action) => {
            state.isFiltered = action.payload;
        }
    }
})

export const {getLibraryProjects,getLibraryFiltered,toggleIsFiltered} = LibrarySlice.actions;

export default LibrarySlice.reducer;

export const selectCurrentLibrary = (state) => state.library.library
export const selectCurrentLibraryFiltered = (state) => state.library.filteredLibrary
export const selectCurrentIsFiltered = (state) => state.library.isFiltered