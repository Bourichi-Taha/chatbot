import { apiSlice } from "../../app/api/apiSlice";
import { getUserProjects } from "./ProjectSlice";

export const ProjectApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({
        fetchUserProjects : builder.query({
            query: () => ({
                url:"/user/projects/",
                method : 'GET',

            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    dispatch(getUserProjects(data));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags:["Projects"]
        }),
        addProject : builder.mutation({
            query: (data) => ({
                url:"/create-project/",
                method : 'POST',
                body:data
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    
                    const {data}=await queryFulfilled
                    console.log(data)
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags:["Projects"]
        }),
        
    })
})

export const {useFetchUserProjectsQuery,useAddProjectMutation} = ProjectApiSlice
