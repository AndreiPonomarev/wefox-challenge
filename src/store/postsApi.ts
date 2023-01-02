import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../types';

export interface PostsState {
  data: Post[];
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    addNewPost: builder.mutation<void, Post>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    editPost: builder.mutation<void, Post>({
      query: (post: Post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi;
