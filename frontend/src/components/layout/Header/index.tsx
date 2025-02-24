import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* 로고 */}
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">
              BIND
            </Typography>
          </Link>
        </Box>

        {/* 네비게이션 메뉴 */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            홈
          </Button>
          <Button color="inherit">
            로그인
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}