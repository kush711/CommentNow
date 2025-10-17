import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function PostCard({ onLogout }) {
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
          }}
          image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60"
          alt="post"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            Designing Nested Comments — UX & Implementation
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>
            A frontend demo: lazy-load child comments on demand, keep UI tidy with Material UI
            components, and allow replies and upvotes for each comment.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onLogout}>
              Logout / Back to Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
