import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

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
        gap: 0.5,
        alignItems: "center",
        flexWrap: "nowrap",
        width: "100%",
        mt: 0.5,
      }}
    >
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        fullWidth
        multiline
        minRows={1}
        maxRows={3}
        size="small"
        sx={{
          flex: 1,
          "& .MuiInputBase-root": {
            fontSize: "0.85rem",
            paddingY: 0.3,
          },
        }}
      />

      <Button
        variant="contained"
        size="small"
        onClick={submit}
        sx={{
          flexShrink: 0,
          textTransform: "none",
          fontSize: "0.8rem",
          px: 1.5,
          py: 0.5,
        }}
      >
        Post
      </Button>
    </Box>
  );
}

