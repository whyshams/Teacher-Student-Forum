import { apiSlice } from "./apiSlice";
const Base_Url = "/api/v2/posts";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.mutation({
      query: () => ({
        url: `${Base_Url}`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}`,
        method: "POST",
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}/edit`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
