import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CommentItem from './CommentItem';
import CommentComposer from './CommentComposer';


export default function CommentList({ parentId = null, allComments = [], users = [], currentUser }) {
const usersById = useMemo(() => Object.fromEntries(users.map(u => [u.id, u])), [users]);



const initialComments = useMemo(() => allComments.filter(c => c.parent_id === parentId).sort((a, b) => b.upvotes - a.upvotes), [allComments, parentId]);


const [comments, setComments] = useState(initialComments);


function handleAdd(text) {
const newComment = {
id: Math.floor(Math.random() * 1000000),
parent_id: parentId,
text,
upvotes: 0,
created_at: new Date().toISOString(),
user_id: currentUser.id,
};
setComments(prev => [newComment, ...prev]);
}


function handleUpdate(updated) {
setComments(prev => prev.map(c => (c.id === updated.id ? updated : c)));
}


return (
<Box>
<CommentComposer onSubmit={handleAdd} placeholder="Add a top-level comment..." />


<Stack spacing={2} sx={{ mt: 2 }}>
{comments.length === 0 && (
<Box sx={{ color: 'text.secondary' }}>No comments yet.</Box>
)}


{comments.map(comment => (
<Box key={comment.id}>
<CommentItem comment={comment} usersById={usersById} allComments={allComments} onUpdate={handleUpdate} currentUser={currentUser} />
<Divider sx={{ mt: 1 }} />
</Box>
))}
</Stack>
</Box>
);
}