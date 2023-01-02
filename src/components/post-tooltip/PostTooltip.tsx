import React from 'react';
import Typography from '@mui/material/Typography';
import { Post } from '../../types';

import styles from './PostTooltip.module.css';

interface Props {
  post: Post;
}

export const PostTooltip: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.root}>
      <pre>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
        <img
          className={styles.postImage}
          src={post.image_url}
          alt={post.title}
        />
      </pre>
    </div>
  );
};
