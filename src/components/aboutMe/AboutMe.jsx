import { Box, Typography, Avatar, Chip, Stack, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProfilePic from "../../assets/IMG_20241102_001719.jpg"

export default function AboutMe({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="about-me-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: "90%", sm: 400 },
          outline: "none",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Avatar
            src={ProfilePic} 
            alt="Your Name"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h6">Kush Sri</Typography>

          <Box sx={{ width: "100%", mt: 2 }}>
            <Typography variant="subtitle2">Tech Stack:</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              <Chip label="MongoDB" size="small" color="primary" />
              <Chip label="Express.js" size="small" color="primary" />
              <Chip label="React.js" size="small" color="primary" />
              <Chip label="Node.js" size="small" color="primary" />
            </Stack>
          </Box>

          <Box sx={{ width: "100%", mt: 2 }}>
            <Typography variant="subtitle2">Currently Learning:</Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Using GenAI for web development
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
