import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF2E6E',  // 주요 브랜드 색상
                        // - 버튼 배경색
                        // - 탭 선택 시 색상
                        // - 링크 색상 등에 사용
    },
    background: {
      default: '#141414',  // 페이지 기본 배경색
      paper: '#1E1E1E',    // 카드, 팝업 등의 배경색
    },
    text: {
      primary: '#FFFFFF',                    // 주요 텍스트 색상
      secondary: 'rgba(255, 255, 255, 0.7)'  // 부가 텍스트 색상
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',          // iOS/macOS 시스템 폰트
      'BlinkMacSystemFont',     // macOS 크롬 시스템 폰트
      'Segoe UI',              // Windows 시스템 폰트
      'Roboto',                // Android 시스템 폰트
      '"Helvetica Neue"',      // macOS 폰트
      'Arial',                 // Windows 기본 폰트
      '"Noto Sans KR"',        // 한글 폰트
      'sans-serif'             // 폴백 폰트
    ].join(','),
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minWidth: '360px',  // 모든 Container의 최소 너비를 360px로 설정
        }
      }
    }
  }
})