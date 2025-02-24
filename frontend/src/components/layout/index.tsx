import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';    
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isViewerPage = location.pathname.includes('/episode/');

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!isViewerPage && <Header />}
      <Box component="main" sx={{ flex: 1, py: isViewerPage ? 0 : 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
} 