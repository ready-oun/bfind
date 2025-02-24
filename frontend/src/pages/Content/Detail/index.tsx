import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Divider, Chip } from '@mui/material'

// 임시 더미 데이터
const mockContentDetail = {
  id: 1,
  title: '웹툰 제목',
  authors: [
    { name: '글/그림', role: '작가이름' },
    { name: '스토리', role: '스토리작가' },
    { name: '각색', role: '각색작가' }
  ],
  description: '작품 설명입니다. 재미있는 이야기가 펼쳐집니다.',
  thumbnail: 'https://placehold.co/400x600',
  status: '연재중' as ContentStatus,
  isOriginal: true,  // 오리지널 여부 추가
  episodes: [
    { id: 1, title: '1화', date: '2024.02.01', thumbnail: 'https://placehold.co/200x200' },
    { id: 2, title: '2화', date: '2024.02.08', thumbnail: 'https://placehold.co/200x200' },
    { id: 3, title: '3화', date: '2024.02.15', thumbnail: 'https://placehold.co/200x200' },
  ]
}

// 상단에 타입 정의 추가
type ContentStatus = '연재중' | '완결' | '휴재중' | '무료공개' | '신작';

// status별 스타일 설정
const getStatusChipProps = (status: ContentStatus) => {
  switch (status) {
    case '연재중':
      return { color: 'primary' as const };
    case '완결':
      return { color: 'success' as const };
    case '휴재중':
      return { color: 'warning' as const };
    case '무료공개':
      return { 
        color: 'info' as const,
        variant: 'outlined' as const 
      };
    case '신작':
      return { 
        color: 'error' as const,
        sx: { fontWeight: 'bold' } 
      };
    default:
      return { color: 'default' as const };
  }
};

export default function ContentDetail() {
  // console.log 없으면 경고 뜨는 이유: 변수를 사용하지 않았기 때문인데 의도적으로 _ 접두사를 붙여도 에러 뜨는 이유 : 타입 추론 때문에 에러 뜨는 것 같음
  const { contentType, id } = useParams()
  const navigate = useNavigate()

  const handleEpisodeClick = (episodeId: number) => {
    navigate(`/${contentType}/${id}/episode/${episodeId}`)  // 예: /webtoon/1/episode/1
  }

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

          {/* Chips 추가 */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1, 
            mb: 2
          }}>
            {/* 첫 줄: 상태 + 콘텐츠 타입 + 오리지널 */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {mockContentDetail.status && (
                <Chip 
                  label={mockContentDetail.status}
                  size="small"
                  {...getStatusChipProps(mockContentDetail.status)}
                />
              )}
              <Chip 
                label={contentType === 'webtoon' ? '웹툰' : '웹소설'} 
                color="primary"
                size="small"
              />
              {mockContentDetail.isOriginal && (
                <Chip 
                  label="오리지널"
                  size="small"
                  color="secondary"
                  sx={{ borderRadius: '4px' }}  // 더 직각에 가깝게
                />
              )}
            </Box>

            {/* 두 번째 줄: 작가 정보 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {mockContentDetail.authors.map((author, index) => (
                <Chip 
                  key={index}
                  label={`${author.name}: ${author.role}`}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '4px',  // 더 직각에 가깝게
                    '& .MuiChip-label': {  // 라벨 스타일 조정
                      px: 1  // 좌우 패딩 줄임
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

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
                bgcolor: 'background.paper',
                boxShadow: 1,  // 약간의 그림자 추가
                transition: 'all 0.2s ease',  // 부드러운 전환 효과
                '&:hover': {
                  boxShadow: 3,  // 호버 시 그림자 강화
                  transform: 'translateY(-2px)',  // 호버 시 살짝 위로
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleEpisodeClick(episode.id)}  // 클릭 핸들러 추가
            >
              <Box
                component="img"
                src={episode.thumbnail}
                alt={episode.title}
                sx={{ 
                  width: 120, 
                  height: 80, 
                  objectFit: 'cover',
                  borderRadius: 1,
                  flexShrink: 0  // 이미지 크기 고정
                }}
              />
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                flex: 1  // 남은 공간 채우기
              }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>{episode.title}</Typography>
                <Typography color="text.secondary" variant="body2">{episode.date}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}