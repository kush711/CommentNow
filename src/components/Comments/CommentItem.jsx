import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton, Button, Stack, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentComposer from './CommentComposer';

export default function CommentItem({ comment, usersById, allComments, currentUser }) {
  const user = usersById[comment.user_id] || { name: 'Unknown', avatar: '' };

  const [childrenOpen, setChildrenOpen] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [replying, setReplying] = useState(false);

  // Like/Dislike state
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);

  const toggleChildren = () => {
    if (!childrenOpen) {
      const children = allComments
        .filter(c => c.parent_id === comment.id)
        .sort((a, b) => b.upvotes - a.upvotes);
      setChildComments(children);
      setChildrenOpen(true);
    } else {
      setChildrenOpen(false);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setUpvotes(prev => prev - 1);
    } else {
      setLiked(true);
      setUpvotes(prev => prev + 1);
      if (disliked) {
        setDisliked(false);
        setUpvotes(prev => prev + 1); // remove previous dislike
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setUpvotes(prev => prev + 1);
    } else {
      setDisliked(true);
      setUpvotes(prev => prev - 1);
      if (liked) {
        setLiked(false);
        setUpvotes(prev => prev - 1); // remove previous like
      }
    }
  };

  const handleReplySubmit = (text) => {
    const newChild = {
      id: Math.floor(Math.random() * 1000000),
      parent_id: comment.id,
      text,
      upvotes: 0,
      created_at: new Date().toISOString(),
      user_id: currentUser.id,
    };
    setChildComments([newChild, ...childComments]);
    setChildrenOpen(true);
    setReplying(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, py: { xs: 0.5, sm: 1 }, flexDirection: 'row' }}>
      <Avatar src={user.avatar} alt={user.name} sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>{user.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.8rem' } }}>
              {new Date(comment.created_at).toLocaleString()}
            </Typography>
          </Box>
          <IconButton size="small" onClick={toggleChildren}>
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography variant="body1" sx={{ mt: 0.5, fontSize: { xs: '0.85rem', sm: '1rem' }, wordBreak: 'break-word' }}>
          {comment.text}
        </Typography>

        <Stack direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 0.5, sm: 1 }} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
          {/* Like button */}
          <motion.div whileTap={{ scale: 1.3 }}>
            <IconButton onClick={handleLike} color={liked ? 'primary' : 'default'} size="small">
              <ThumbUpAltOutlinedIcon />
            </IconButton>
          </motion.div>
          <Typography variant="body2" sx={{ mt: 0.5 }}>{upvotes}</Typography>

          {/* Dislike button */}
          <motion.div whileTap={{ scale: 1.3 }}>
            <IconButton onClick={handleDislike} color={disliked ? 'error' : 'default'} size="small">
              <ThumbDownAltOutlinedIcon />
            </IconButton>
          </motion.div>

          {/* Reply button */}
          <Button size="small" startIcon={<ReplyIcon />} onClick={() => setReplying(prev => !prev)}>
            Reply
          </Button>

          {/* View/Hide replies */}
          <Button size="small" onClick={toggleChildren}>
            {childrenOpen ? `Hide ${childComments.length} replies` : `View replies`}
          </Button>
        </Stack>

        {replying && (
          <Box sx={{ mt: 1 }}>
            <CommentComposer onSubmit={handleReplySubmit} placeholder={`Reply to ${user.name}...`} />
          </Box>
        )}

        <AnimatePresence>
          {childrenOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ borderLeft: '2px solid', borderColor: 'divider', pl: { xs: 1, sm: 2 }, mt: 1 }}>
                {childComments.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No replies yet.
                  </Typography>
                )}
                {childComments.map(child => (
                  <Box key={child.id} sx={{ mt: 1 }}>
                    <CommentItem
                      comment={child}
                      usersById={usersById}
                      allComments={allComments}
                      currentUser={currentUser}
                    />
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
