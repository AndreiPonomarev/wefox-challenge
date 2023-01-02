import { Typography, Box, Button, Modal, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEditPostMutation, useGetPostByIdQuery } from '../../store/postsApi';
import { Post } from '../../types';

import styles from './Post.module.css';

export const PostPage = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const params = useParams();

  const { register, handleSubmit } = useForm<Partial<Post>>();

  const {
    data: postData,
    error,
    isLoading,
    refetch,
  } = useGetPostByIdQuery(params.id as string);

  const [editPost] = useEditPostMutation();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = (data: any) => {
    if (postData && data) {
      editPost({ ...data, id: postData.id });
      setOpenModal(false);
      refetch();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !postData) return <div>Missing post!</div>;
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

      <Button variant="outlined" onClick={handleOpenModal}>
        Edit
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit post
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              {...register('title')}
              id="title"
              label="Title"
              variant="standard"
              defaultValue={postData.title}
            />
            <TextField
              required
              {...register('content')}
              id="content"
              label="Content"
              multiline
              rows={2}
              variant="standard"
              defaultValue={postData.content}
            />
            <div>
              <TextField
                required
                {...register('lat')}
                id="lat"
                label="Lat"
                variant="standard"
                defaultValue={postData.lat}
              />
              <TextField
                required
                {...register('long')}
                id="long"
                label="Long"
                variant="standard"
                defaultValue={postData.long}
              />
            </div>
            <TextField
              required
              {...register('image_url')}
              id="image_url"
              label="Image URL"
              variant="standard"
              defaultValue={postData.image_url}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
