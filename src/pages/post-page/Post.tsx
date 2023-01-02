import { Typography, Divider } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../store/postsApi';

import styles from './Post.module.css';

export const PostPage = () => {
  const params = useParams();
  const {
    data: postData,
    error,
    isLoading,
  } = useGetPostByIdQuery(params.id as string);

  if (isLoading) return <div>Loading...</div>
  if (error || !postData) return <div>Missing post!</div>

  return (
    <div className={styles.root}>
      {postData && (
        <div className={styles.root}>
          <Typography variant="h3" gutterBottom>
            {postData.title}
          </Typography>
          <img
            className={styles.postImage}
            src={postData.image_url}
            alt={postData.title}
          />
          <Typography className={styles.content} variant="body1" gutterBottom>
            {postData.content}
          </Typography>

          <Typography className={styles.content} variant="body1" gutterBottom>
            {`GEO: ${postData.long} , ${postData.lat}`}
          </Typography>
        </div>
      )}
    </div>
  );
};
