import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PostCard() {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // stack on mobile
        gap: 2,
        p: { xs: 1, sm: 2 },
        mb: 3,
        maxWidth: 700,
        mx: 'auto',
        boxShadow: 3,
      }}
      elevation={2}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: '100%', sm: 160 }, // full width on mobile
          height: { xs: 200, sm: 'auto' },
          borderRadius: 1,
        }}
        image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60"
        alt="post"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Designing Nested Comments — UX & Implementation
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontSize: { xs: '0.85rem', sm: '1rem' } }}
        >
          A frontend demo: lazy-load child comments on demand, keep UI tidy with Material UI
          components, and allow replies and upvotes for each comment.
        </Typography>
      </CardContent>
    </Card>
  );
}
