import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CommentItem from "./CommentItem";
import CommentComposer from "./CommentComposer";
import { sortCommentsByUpvotes } from "./utils/commentHelper.js";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CommentList({ parentId = null, allComments = [], users = [], currentUser }) {
  const usersById = useMemo(() => Object.fromEntries(users.map(u => [u.id, u])), [users]);
  const [sortType, setSortType] = useState("popular");
  const [visibleComments, setVisibleComments] = useState(() => (Array.isArray(allComments) ? [...allComments] : []));

  const filteredComments = useMemo(
    () => visibleComments.filter(c => c.parent_id === parentId),
    [visibleComments, parentId]
  );

  const sortedComments = useMemo(() => {
    if (sortType === "popular") return sortCommentsByUpvotes(filteredComments);
    return [...filteredComments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [filteredComments, sortType]);

  const handleAdd = text => {
    const newComment = {
      id: Math.random().toString(36).slice(2, 10),
      parent_id: parentId,
      text,
      upvotes: 0,
      created_at: new Date().toISOString(),
      user_id: currentUser.id,
    };
    setVisibleComments(prev => [newComment, ...prev]);
  };

  const getAllIdsRecursive = (id, list) => {
    const ids = [id];
    const children = list.filter(c => c.parent_id === id);
    for (const child of children) {
      ids.push(...getAllIdsRecursive(child.id, list));
    }
    return ids;
  };

  const handleDelete = (id, userId) => {
    setVisibleComments(prev => {
      const idsToDelete = getAllIdsRecursive(id, prev);

      return prev.filter(c => {
        if (!idsToDelete.includes(c.id)) return true;

        // Admin deletes everything in the subtree
        if (currentUser?.isAdmin) return false;

        // Non-admin deletes only their own comments
        return c.user_id !== userId;
      });
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CommentComposer onSubmit={handleAdd} placeholder="Add a top-level comment..." />

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <FormControl size="small" sx={{ minWidth: { xs: 120, sm: 160 } }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortType} label="Sort by" onChange={e => setSortType(e.target.value)}>
            <MenuItem value="popular">Most Popular</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack spacing={2} sx={{ mt: 2 }}>
        {sortedComments.length === 0 && <Box sx={{ color: "text.secondary" }}>No comments yet.</Box>}
        {sortedComments.map(comment => (
          <Box key={comment.id}>
            <CommentItem
              comment={comment}
              usersById={usersById}
              allComments={visibleComments} // always pass the updated list
              currentUser={currentUser}
              onDeleteComment={handleDelete} // recursive delete
            />
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
