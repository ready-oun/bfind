import { useParams } from 'react-router-dom'
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
  console.log(contentType, id)
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 작품 정보 영역 */}
      <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
        {/* 썸네일 */}
        <Box 
          component="img"
          src={mockContentDetail.thumbnail}
          alt={mockContentDetail.title}
          sx={{ 
            width: 280,
            height: 400,
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
        
        {/* 작품 정보 */}
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {mockContentDetail.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {mockContentDetail.author}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {mockContentDetail.description}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 에피소드 목록 */}
      <Typography variant="h5" component="h2" gutterBottom>
        에피소드
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockContentDetail.episodes.map((episode) => (
          <Box 
            key={episode.id}
            sx={{ 
              display: 'flex',
              gap: 2,
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
                cursor: 'pointer'
              }
            }}
          >
            <Box
              component="img"
              src={episode.thumbnail}
              alt={episode.title}
              sx={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <Box>
              <Typography variant="h6">{episode.title}</Typography>
              <Typography color="text.secondary">{episode.date}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  )
}