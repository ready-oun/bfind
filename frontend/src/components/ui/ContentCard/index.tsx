import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

interface ContentCardProps {
  title: string // 카드 제목
  author: string // 카드 저자
  thumbnailUrl: string // 썸네일 이미지 주소
  latestEpisode?: string  // 웹툰/웹소설의 최신화
  updateDate?: string     // 업데이트 날짜
  isNew?: boolean        // 신작 표시
}

export default function ContentCard({
  title, // 카드 제목
  author, // 카드 저자
  thumbnailUrl, // 썸네일 이미지 주소
  latestEpisode, // 최신화 정보
  updateDate, // 업데이트 날짜
  isNew // 신작 표시
}: ContentCardProps) {
    // DEBUG 콘솔 로그
    console.log('ContentCard props:', {
      title,
      author,
      latestEpisode,
      updateDate,
      isNew
    })
  return (
    <Card 
      sx={{ 
        width: 200, // 카드 너비
        height: 380, // 카드 높이
        bgcolor: 'background.paper', // 카드 배경색
        position: 'relative', // 카드 상대 위치
        '&:hover': {
          transform: 'translateY(-4px)', // 카드 위치 변경 
          transition: 'transform 0.2s ease-in-out', // 애니메이션 효과 ( 다른 옵션: 'ease', 'ease-in', 'ease-out', 'ease-in-out' )
          boxShadow: 6 // 그림자 효과
        }
      }}
    >
      {/* 썸네일 이미지 */}
      <CardMedia
        component="img" // 이미지 요소
        height={280} // 이미지 높이
        image={thumbnailUrl} // 이미지 주소
        alt={title} // 이미지 대체 텍스트
        sx={{ objectFit: 'cover' }} // 이미지 크기 조정
      />
      
      {/* NEW 뱃지 */}
      {isNew && (
        <Box
          sx={{
            position: 'absolute', // 요소 절대 위치
            top: 8, // 요소 위 여백
            left: 8, // 요소 왼쪽 여백
            bgcolor: 'primary.main', // 요소 배경색
            color: 'white', // 요소 텍스트 색상
            px: 1, // 요소 좌우 여백
            py: 0.5, // 요소 상하 여백
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        >
          NEW
        </Box>
      )}

      {/* 콘텐츠 정보 */}
      <CardContent sx={{ 
        p: 1.5, 
        height: 120,  
        overflow: 'hidden'
      }}>
        <Typography 
          variant="subtitle1" 
          component="h3" 
          noWrap 
          sx={{ 
            fontWeight: 'bold',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          noWrap
          sx={{ 
            mb: 0.5  // 마진 추가
          }}
        >
          {author}
        </Typography>
        {(latestEpisode && updateDate) && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            noWrap
            sx={{ 
              display: 'block',
              // border: '1px solid yellow'
            }}
          >
            {`${latestEpisode} · ${updateDate}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
} 