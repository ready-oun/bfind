import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Divider } from '@mui/material'

// 임시 더미 데이터
const mockContentDetail = {
  id: 1,
  title: '웹툰 제목',
  author: '작가이름',
  description: '작품 설명입니다. 재미있는 이야기가 펼쳐집니다.',
  thumbnail: 'https://placehold.co/400x600',
  episodes: [
    { id: 1, title: '1화', date: '2024.02.01', thumbnail: 'https://placehold.co/200x200' },
    { id: 2, title: '2화', date: '2024.02.08', thumbnail: 'https://placehold.co/200x200' },
    { id: 3, title: '3화', date: '2024.02.15', thumbnail: 'https://placehold.co/200x200' },
  ]
}

export default function ContentDetail() {
  // console.log 없으면 경고 뜨는 이유: 변수를 사용하지 않았기 때문인데 의도적으로 _ 접두사를 붙여도 에러 뜨는 이유 : 타입 추론 때문에 에러 뜨는 것 같음
  const { contentType, id } = useParams()
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg">
      {/* 작품 정보 영역 */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',  // 세로 배치로 변경
        gap: 4, 
        py: 6,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        {/* 썸네일 - 크기 수정 */}
        <Box 
          component="img"
          src={mockContentDetail.thumbnail}
          alt={mockContentDetail.title}
          sx={{ 
            width: '100%',  // 전체 너비
            height: { xs: 400, sm: 500, md: 600 },  // 반응형으로 큰 높이 지정
            objectFit: 'cover',  // 이미지가 잘리더라도 영역을 채움
            objectPosition: 'center',  // 이미지 중간부터 보여주기 ( 다른 옵션 : center, top, bottom )
            borderRadius: 2,
          }}
        />
        
        {/* 작품 정보 */}
        <Box sx={{ 
          width: '100%',  // 전체 너비 사용
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center"  // 제목 중앙 정렬
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }  // 반응형 폰트 크기
            }}
          >
            {mockContentDetail.title}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            align="center"  // 작가 이름 중앙 정렬
            gutterBottom
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' }  // 반응형 폰트 크기
            }}
          >
            {mockContentDetail.author}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' }  // 반응형 폰트 크기
            }}
          >
            {mockContentDetail.description}
          </Typography>
        </Box>
      </Box>

      {/* 에피소드 목록 */}
      <Box sx={{ py: 4 }}>  
        <Typography variant="h5" component="h2" gutterBottom>
          에피소드
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockContentDetail.episodes.map((episode) => (
            <Box 
              key={episode.id}
              sx={{ 
                display: 'flex',
                gap: 3,  // 간격 늘림
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}
            >
              <Box
                component="img"
                src={episode.thumbnail}
                alt={episode.title}
                sx={{ width: 120, height: 80, objectFit: 'cover' }}
              />
              <Box>
                <Typography variant="h6">{episode.title}</Typography>
                <Typography color="text.secondary">{episode.date}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}