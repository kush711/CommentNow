import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AboutMe from "../aboutMe/AboutMe";

export default function PostCard({ onLogout }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          p: 2,
          mb: 3,
          width: '100%',
          boxShadow: 3,
        }}
        elevation={2}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 160 },
            height: 160,
            borderRadius: 1,
            objectFit: "cover",
          }}
          image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60"
          alt="post"
        />
        <CardContent sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            Inter-IIT Tech Meet 14.0 — "Resonating Cascades"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>
            A collaborative platform for IIT students to tackle real-world challenges posed by industry leaders. Teams work intensively on problem statements across various domains, culminating in a showcase of innovative solutions.
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-start" }
            }}
          >
            <Button variant="outlined" onClick={onLogout} sx={{ flexShrink: 0 }}>
              Logout / Back to Login
            </Button>
            <Button variant="contained" onClick={() => setAboutOpen(true)} sx={{ flexShrink: 0 }}>
              About Me
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AboutMe open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </Box>
  );
}
