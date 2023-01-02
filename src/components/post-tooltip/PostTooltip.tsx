import React from 'react';
import Typography from '@mui/material/Typography';
import { Post } from '../../types';

import styles from './PostTooltip.module.css';
import { Divider } from '@mui/material';

interface Props {
  post: Post;
}

export const PostTooltip: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.root}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Divider />
      <img className={styles.postImage} src={post.image_url} alt={post.title} />
      <Typography className={styles.content} variant="body1" gutterBottom>
        {post.content}
      </Typography>
    </div>
  );
};
