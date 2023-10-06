import { apiSlice } from "../../app/api/apiSlice";
import { selectFile, setFiles } from "./filesSlice";

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllFiles: builder.query({
            query: () => ({
                url: "/get_files",
                method: 'GET',

            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {

                    const { data } = await queryFulfilled
                    dispatch(setFiles(data));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ["Files"]
        }),
        uploadFile: builder.mutation({
            query: (bodyFormData ) => ({
                url: "/upload",
                method: 'POST',
                body: bodyFormData ,
                formData: true,

            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {

                    const { data } = await queryFulfilled
                    console.log("thisisdata:",data)
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ["Files"],
        }),
        selectFiles: builder.mutation({
            query: ({fileNames} ) => ({
                url: "/select",
                method: 'POST',
                body: { fileNames },

            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {

                    const { data } = await queryFulfilled
                    console.log("thisisdata:",data)
                } catch (error) {
                    console.log(error);
                }
            },
        })
    })
})

export const { useGetAllFilesQuery,useUploadFileMutation,useSelectFilesMutation } = filesApiSlice
