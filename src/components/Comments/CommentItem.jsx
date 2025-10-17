import { useEffect } from "react";
import { Avatar, Box, Typography, IconButton, Button, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentComposer from "./CommentComposer";
import useCommentActions from "./hooks/useCommentAction.js";
import { sortCommentsByUpvotes, formatDate } from "./utils/commentHelper.js";

export default function CommentItem({ comment, usersById, allComments, currentUser, onDeleteComment }) {
  const user = usersById[comment.user_id] || { name: "Unknown", avatar: "" };
  const {
    liked, disliked, upvotes, replying, childComments, childrenOpen,
    setReplying, setChildrenOpen, setChildComments, handleLike, handleDislike, handleReplySubmit
  } = useCommentActions(comment, currentUser);

  const toggleChildren = () => {
    if (!childrenOpen) {
      const children = sortCommentsByUpvotes(allComments.filter(c => c.parent_id === comment.id));
      setChildComments(children);
      setChildrenOpen(true);
    } else setChildrenOpen(false);
  };

  const handleDelete = () => {
    if (currentUser.isAdmin || currentUser.id === comment.user_id) {
      onDeleteComment(comment.id, comment.user_id);
    }
  };

  // Sync childComments whenever allComments updates while children are open
  useEffect(() => {
    if (childrenOpen) {
      const children = sortCommentsByUpvotes(allComments.filter(c => c.parent_id === comment.id));
      setChildComments(children);
    }
  }, [allComments, childrenOpen, comment.id, setChildComments]);

  return (
    <Box sx={{ display: "flex", gap: 2, py: 1, width: "100%", flexWrap: "wrap" }}>
      <Avatar src={user.avatar} alt={user.name} sx={{ width: 35, height: 35, flexShrink: 0 }} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(comment.created_at)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {(currentUser.isAdmin || currentUser.id === comment.user_id) && (
              <IconButton size="small" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={toggleChildren}>
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Typography sx={{ mt: 0.5, mb: 0.5, wordBreak: "break-word" }}>
          {comment.text}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", py: 0.5 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <motion.div whileTap={{ scale: 1.2 }}>
              <IconButton onClick={handleLike} color={liked ? "primary" : "default"} size="small" sx={{ p: 0.5 }}>
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </IconButton>
            </motion.div>
            <Typography variant="body2">{upvotes}</Typography>
          </Stack>

          <motion.div whileTap={{ scale: 1.2 }}>
            <IconButton onClick={handleDislike} color={disliked ? "error" : "default"} size="small" sx={{ p: 0.5 }}>
              <ThumbDownAltOutlinedIcon fontSize="small" />
            </IconButton>
          </motion.div>

          <Button size="small" startIcon={<ReplyIcon />} onClick={() => setReplying(p => !p)} sx={{ flexShrink: 0, minWidth: "fit-content" }}>
            Reply
          </Button>

          <Button size="small" onClick={toggleChildren} sx={{ flexShrink: 0, minWidth: "fit-content" }}>
            {childrenOpen ? `Hide ${childComments.length} replies` : "View replies"}
          </Button>
        </Box>

        {replying && (
          <Box sx={{ mt: 1 }}>
            <CommentComposer onSubmit={handleReplySubmit} placeholder={`Reply to ${user.name}...`} />
          </Box>
        )}

        <AnimatePresence>
          {childrenOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              <Box sx={{ borderLeft: "2px solid", borderColor: "divider", pl: 2, mt: 1 }}>
                {childComments.length === 0 && <Typography variant="body2" color="text.secondary">No replies yet.</Typography>}
                {childComments.map(child => (
                  <Box key={child.id} sx={{ mt: 1 }}>
                    <CommentItem
                      comment={child}
                      usersById={usersById}
                      allComments={allComments}
                      currentUser={currentUser}
                      onDeleteComment={onDeleteComment}
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
