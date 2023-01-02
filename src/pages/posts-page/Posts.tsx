import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { WorldMapChart } from '../../components/world-map-chart/WorldMapChart';
import { useAddNewPostMutation, useGetPostsQuery } from '../../store/postsApi';
import { Post } from '../../types';

import styles from './Posts.module.css';

export const Posts = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const { data, refetch } = useGetPostsQuery();
  const [addPost] = useAddNewPostMutation();
  const { register, handleSubmit } = useForm<Partial<Post>>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = (data: any) => {
    addPost(data);
    setOpenModal(false);
    refetch();
  };

  return (
    <div className={styles.root}>
      <WorldMapChart posts={data} />
      <Button variant="outlined" onClick={handleOpenModal}>
        Add new
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new post
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              {...register('title')}
              id="title"
              label="Title"
              variant="standard"
            />
            <TextField
              required
              {...register('content')}
              id="content"
              label="Content"
              multiline
              rows={2}
              variant="standard"
            />
            <div>
              <TextField
                required
                {...register('lat')}
                id="lat"
                label="Lat"
                variant="standard"
              />
              <TextField
                required
                {...register('long')}
                id="long"
                label="Long"
                variant="standard"
              />
            </div>
            <TextField
              required
              {...register('image_url')}
              id="image_url"
              label="Image URL"
              variant="standard"
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
