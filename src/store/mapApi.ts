import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Topology} from 'topojson-specification'

import { Post } from '../types';

export interface PostsState {
  data: Post[];
}

export const mapApi = createApi({
  reducerPath: 'mapApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/data' }),
  endpoints: (builder) => ({
    getMap: builder.query<Topology, void>({
      query: () => '/world-110m.v1.json',
    }),
  }),
});

export const { useGetMapQuery } = mapApi;
