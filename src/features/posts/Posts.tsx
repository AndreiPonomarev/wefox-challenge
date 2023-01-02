import React from 'react';
import { useAppSelector } from '../../app/hooks';


import styles from './Posts.module.css';
import { selectPosts } from './postsSlice';

export function Posts() {
      const posts = useAppSelector(selectPosts);


  return (
    <div className={styles.root}>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
