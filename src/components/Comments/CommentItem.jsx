import { useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentComposer from "./CommentComposer";
import useCommentActions from "./hooks/useCommentAction.js";
import { sortCommentsByUpvotes, formatDate } from "./utils/commentHelper.js";

export default function CommentItem({
  comment,
  usersById,
  allComments,
  currentUser,
  onDeleteComment,
}) {
  const user = usersById[comment.user_id] || { name: "Unknown", avatar: "" };
  const {
    liked,
    disliked,
    upvotes,
    replying,
    childComments,
    childrenOpen,
    setReplying,
    setChildrenOpen,
    setChildComments,
    handleLike,
    handleDislike,
    handleReplySubmit,
  } = useCommentActions(comment, currentUser);

  const toggleChildren = () => {
    if (!childrenOpen) {
      const children = sortCommentsByUpvotes(
        allComments.filter((c) => c.parent_id === comment.id)
      );
      setChildComments(children);
      setChildrenOpen(true);
    } else setChildrenOpen(false);
  };

  const handleDelete = () => {
    if (currentUser.isAdmin || currentUser.id === comment.user_id) {
      onDeleteComment(comment.id, comment.user_id);
    }
  };

  // keep children synced when allComments updates
  useEffect(() => {
    if (childrenOpen) {
      const children = sortCommentsByUpvotes(
        allComments.filter((c) => c.parent_id === comment.id)
      );
      setChildComments(children);
    }
  }, [allComments, childrenOpen, comment.id, setChildComments]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0.8, sm: 1.2 },
        py: { xs: 0.3, sm: 0.6 },
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ width: 30, height: 30, flexShrink: 0 }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
            >
              {formatDate(comment.created_at)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5}>
            {(currentUser.isAdmin || currentUser.id === comment.user_id) && (
              <IconButton size="small" onClick={handleDelete} sx={{ p: 0.3 }}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
            <IconButton size="small" onClick={toggleChildren} sx={{ p: 0.3 }}>
              <KeyboardArrowDownIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>

        <Typography
          sx={{
            mt: 0.3,
            mb: 0.3,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {comment.text}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            py: 0.3,
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={0.3} alignItems="center">
            <motion.div whileTap={{ scale: 1.2 }}>
              <IconButton
                onClick={handleLike}
                color={liked ? "primary" : "default"}
                size="small"
                sx={{ p: 0.3 }}
              >
                <ThumbUpAltOutlinedIcon fontSize="inherit" />
              </IconButton>
            </motion.div>
            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
              {upvotes}
            </Typography>
          </Stack>

          <motion.div whileTap={{ scale: 1.2 }}>
            <IconButton
              onClick={handleDislike}
              color={disliked ? "error" : "default"}
              size="small"
              sx={{ p: 0.3 }}
            >
              <ThumbDownAltOutlinedIcon fontSize="inherit" />
            </IconButton>
          </motion.div>

          <Button
            size="small"
            startIcon={<ReplyIcon />}
            onClick={() => setReplying((p) => !p)}
            sx={{
              flexShrink: 0,
              minWidth: "fit-content",
              fontSize: "0.7rem",
              textTransform: "none",
              p: 0.2,
            }}
          >
            Reply
          </Button>

          <Button
            size="small"
            onClick={toggleChildren}
            sx={{
              flexShrink: 0,
              minWidth: "fit-content",
              fontSize: "0.7rem",
              textTransform: "none",
              p: 0.2,
            }}
          >
            {childrenOpen
              ? `Hide ${childComments.length} replies`
              : "View replies"}
          </Button>
        </Box>

        {replying && (
          <Box sx={{ mt: 0.6 }}>
            <CommentComposer
              onSubmit={handleReplySubmit}
              placeholder={`Reply to ${user.name}...`}
            />
          </Box>
        )}

        <AnimatePresence>
          {childrenOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Box
                sx={{
                  borderLeft: "1.5px solid",
                  borderColor: "divider",
                  pl: { xs: 0.8, sm: 1.6 },
                  mt: { xs: 0.3, sm: 0.6 },
                  ml: { xs: 0.5, sm: 1 },
                }}
              >
                {childComments.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    No replies yet.
                  </Typography>
                )}
                {childComments.map((child) => (
                  <Box key={child.id} sx={{ mt: { xs: 0.4, sm: 0.8 } }}>
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
