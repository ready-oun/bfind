import { useState } from 'react'
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Divider,
  Badge
} from '@mui/material'
import { 
  Person as PersonIcon,
  Notifications as NotificationIcon,
  Bookmark as BookmarkIcon,
  History as HistoryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: 'white' }}>
        <PersonIcon />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: 'background.paper',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              py: 1.5
            }
          }
        }}
      >
        {/* 사용자 정보 */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">user@email.com</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Typography color="primary" variant="h6" sx={{ mr: 1 }}>62</Typography>
              <Typography variant="body2" color="text.secondary">코인</Typography>
            </Box>
            <Typography 
              component={Link} 
              to="/payment"
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              코인 충전
            </Typography>
          </Box>
        </Box>
        
        <Divider />
        
        {/* 알림함 */}
        <MenuItem component={Link} to="/notifications">
          <Badge badgeContent={4} color="primary" sx={{ mr: 2 }}>
            <NotificationIcon />
          </Badge>
          <Typography>알림함</Typography>
        </MenuItem>
        
        {/* 선물함 */}
        <MenuItem component={Link} to="/gifts">
          <Badge badgeContent={2} color="primary" sx={{ mr: 2 }}>
            <BookmarkIcon />
          </Badge>
          <Typography>선물함</Typography>
        </MenuItem>
        
        {/* 내 서재 */}
        <MenuItem component={Link} to="/library">
          <HistoryIcon sx={{ mr: 2 }} />
          <Typography>내 서재</Typography>
        </MenuItem>
        
        {/* 내 정보 */}
        <MenuItem component={Link} to="/profile">
          <PersonIcon sx={{ mr: 2 }} />
          <Typography>내 정보</Typography>
        </MenuItem>
        
        <Divider />
        
        {/* 로그아웃 */}
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
            <Typography variant="body2" component={Link} to="/customer-service" sx={{ color: 'text.secondary' }}>
              고객지원
            </Typography>
            <Typography variant="body2" component={Link} to="/terms" sx={{ color: 'text.secondary' }}>
              연재문의
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  )
} 