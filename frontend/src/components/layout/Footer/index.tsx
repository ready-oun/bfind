import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                py: 3,
                mt: 'auto',  // 하단에 고정
                backgroundColor: 'background.paper' 
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://bind.com">
                        BIND
                    </Link>{' '}
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}
        