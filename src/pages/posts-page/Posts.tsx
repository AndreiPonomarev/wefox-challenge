import React from 'react';
import { WorldMapChart } from '../../components/world-map-chart/WorldMapChart';
import { useGetPostsQuery } from '../../store/postsApi';

import styles from './Posts.module.css';

export const Posts = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  return (
    <div className={styles.root}>
      <WorldMapChart posts={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
