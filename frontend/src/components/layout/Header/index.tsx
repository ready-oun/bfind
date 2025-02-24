import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import UserMenu from './UserMenu'
import { LibraryBooks as LibraryIcon } from '@mui/icons-material'

export default function Header() {
  const navigate = useNavigate()

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            BIND
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/search')}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}