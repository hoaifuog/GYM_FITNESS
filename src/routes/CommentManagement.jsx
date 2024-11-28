import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';

const CommentManagement = () => {
  const [comments, setComments] = useState([
    {
      _id: '1',
      userId: '1',
      username: 'Phuong',
      userImage: 'https://example.com/user1.jpg',
      content: 'This is a great post! Thanks for sharing.',
      created_at: new Date().toISOString()
    },
    {
      _id: '2',
      userId: '2',
      username: 'ABC',
      userImage: 'https://example.com/user2.jpg',
      content: 'Very informative and helpful. Keep it up!',
      created_at: new Date().toISOString()
    },
    // Thêm comment mẫu khác tại đây nếu cần
  ]);

  useEffect(() => {
    // Fetch comments from the backend
    axios.get('/api/comments')
      .then(response => setComments([...comments, ...response.data]))
      .catch(error => console.error(error));
  }, []);

  const handleDeleteComment = (commentId) => {
    axios.delete(`/api/comments/${commentId}`)
      .then(response => {
        setComments(comments.filter(comment => comment._id !== commentId));
      })
      .catch(error => console.error(error));
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom style={{ color: 'white' }}>Comments</Typography>
        <Grid container spacing={2}>
          {comments.map(comment => (
            <Grid item xs={12} key={comment._id}>
              <Card sx={{ display: 'flex', padding: 2, alignItems: 'center' }}>
                <Avatar src={comment.userImage} alt={comment.username} sx={{ marginRight: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{comment.username}</Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                  <Typography variant="caption" color="textSecondary">{new Date(comment.created_at).toLocaleString()}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentManagement;
