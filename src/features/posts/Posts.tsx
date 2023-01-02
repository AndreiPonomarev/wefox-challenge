import React from 'react';
import { useGetPostsQuery } from './postsApi';

import styles from './Posts.module.css';

export function Posts() {
  const { data, error, isLoading } = useGetPostsQuery();

  return (
    <div className={styles.root}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
