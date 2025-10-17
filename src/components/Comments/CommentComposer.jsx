import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function CommentComposer({ onSubmit, placeholder = "Write a comment..." }) {
  const [text, setText] = useState("");

  const submit = e => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "flex-start",
        overflowX: "auto",
        pb: 1,
        minWidth: 0,
      }}
    >
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        fullWidth
        multiline
        minRows={2}
        size="small"
        sx={{ flexShrink: 0, minWidth: 240 }}
      />
      <Button variant="contained" onClick={submit} sx={{ flexShrink: 0 }}>
        Post
      </Button>
    </Box>
  );
}
