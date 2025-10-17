import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Login from './components/Auth/Login';
import PostCard from './components/Post/PostCard';
import CommentList from './components/Comments/CommentList';
import { SAMPLE_COMMENTS, SAMPLE_USERS } from './data/sampleData';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('demo_user')) || null;
    } catch {
      return null;
    }
  });

  const [comments] = useState(SAMPLE_COMMENTS);
  const [users] = useState(SAMPLE_USERS);

  useEffect(() => {
    if (user) localStorage.setItem('demo_user', JSON.stringify(user));
    else localStorage.removeItem('demo_user');
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
          <Typography variant="h6">Nested Comments — Demo</Typography>
          <Box>
            <Typography variant="body2" component="div">
              Logged in as <strong>{user.name}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ width: '100%', overflowX: { xs: 'auto', sm: 'visible' } }}>
        <PostCard />
      </Box>

      <Paper sx={{ p: 2, mt: 3, width: '100%' }} elevation={1}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Comments
        </Typography>
        <CommentList
          parentId={null}
          allComments={comments}
          users={users}
          currentUser={user}
        />
      </Paper>
    </Container>
  );
}
