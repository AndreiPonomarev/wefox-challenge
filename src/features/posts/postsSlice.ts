import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Post {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
export interface PostsState {
  data: Post[];
}

const initialState: PostsState = {
  data: [
    {
      id: 1,
      title: 'Madrid',
      content:
        'Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.',
      lat: '40.41678',
      long: '-3.70379',
      image_url:
        'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
      created_at: '2022-06-20T12:09:47.921Z',
      updated_at: '2022-06-20T12:09:47.921Z',
    },
  ],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});


export const selectPosts = (state: RootState) => state.posts.data;

export default postsSlice.reducer;
