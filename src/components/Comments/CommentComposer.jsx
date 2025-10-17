import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function CommentComposer({ onSubmit, placeholder = 'Write a comment...' }) {
const [text, setText] = useState('');


function submit(e) {
e && e.preventDefault && e.preventDefault();
if (!text.trim()) return;
onSubmit(text.trim());
setText('');
}


return (
<Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
<TextField value={text} onChange={e => setText(e.target.value)} placeholder={placeholder} fullWidth multiline minRows={2} size="small" />
<Button variant="contained" onClick={submit}>Post</Button>
</Box>
);
}