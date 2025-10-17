import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SAMPLE_USERS } from '../../data/sampleData';


export default function Login({ onLogin }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');


function handleSubmit(e) {
e.preventDefault();
// allow @example.com domain OR password === 'password'
if (!email.endsWith('@example.com') && password !== 'password') {
setError("Use an @example.com email or password 'password'");
return;
}
const match = SAMPLE_USERS.find(u => email.includes(u.name.split(' ')[0].toLowerCase()));
const user = match || { id: 'user-demo', name: email.split('@')[0], email };
onLogin({ ...user, email });
}


return (
<Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
<Paper sx={{ p: 4, width: 420 }} elevation={3}>
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
<Avatar sx={{ bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
<Typography variant="h6">Sign in to view comments</Typography>
</Box>
<Box component="form" onSubmit={handleSubmit}>
<TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
<TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
{error && <Typography color="error" variant="body2">{error}</Typography>}
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
<Button variant="contained" type="submit">Login</Button>
<Typography variant="caption" color="text.secondary">Allowed: @example.com or password 'password'</Typography>
</Box>
</Box>
</Paper>
</Box>
);
}