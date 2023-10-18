import { apiSlice } from './../../app/api/apiSlice';

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createProject: builder.mutation({
        query: (projectData) => ({
          url: "/create-project/",
          method: "POST",
          body: projectData,
        }),
        invalidatesTags: [{ type: "Projects", id: "LIST" }],
      }),
      getProjects: builder.query({
        query: () => ({
          url: "/user/projects/",
          method: "GET",
        }),
      }),
      updateProject: builder.mutation({
        query: ({ projectId, updatedData }) => ({
          url: `update-project/${projectId}/`,
          method: "PATCH",
          body: updatedData,
        }),
      }),
      deleteProject: builder.mutation({ // Move this outside the updateProject mutation
        query: ({ id }) => ({
          url: `delete/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Projects", id: "LIST" }],
      }),
    }),
  });
  
  export const {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
  } = projectApiSlice;
  