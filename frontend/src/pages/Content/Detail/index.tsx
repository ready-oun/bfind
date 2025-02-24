import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Divider, Chip, AppBar, Toolbar, IconButton } from '@mui/material'
import { mockWebtoons, mockNovels, ContentItem, ContentStatus } from '../../../mocks/contents'

// contentType 타입 정의
type ContentType = 'webtoon' | 'novel'

// 라우트 파라미터 타입 정의
type RouteParams = {
  contentType: ContentType;
  id: string;
}

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
  // useParams의 타입을 RouteParams로 지정
  const { contentType, id } = useParams() as RouteParams
  const navigate = useNavigate()

  // contentType과 id가 없는 경우 early return
  if (!contentType || !id) {
    return <Typography>잘못된 접근입니다.</Typography>
  }
  // 이제 contentType과 id가 있음이 보장됨
  const currentContent = contentType === 'webtoon' 
    ? mockWebtoons.all.find(item => item.id === Number(id))
    : mockNovels.all.find(item => item.id === Number(id))

  // 데이터가 없을 경우 early return
  if (!currentContent) {
    return <Typography>콘텐츠를 찾을 수 없습니다.</Typography>
  }

  // 이 아래부터는 currentContent가 ContentItem 타입임이 보장됨
  const handleEpisodeClick = (episodeId: number) => {
    navigate(`/${contentType}/${id}/episode/${episodeId}`)
  }

  return (
    <Container maxWidth="lg">
      {/* 작품 정보 영역 */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 4, 
        py: 6,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        {/* 썸네일 */}
        <Box 
          component="img"
          src={currentContent.thumbnail}
          alt={currentContent.title}
          sx={{ 
            width: '100%',
            height: { xs: 400, sm: 500, md: 600 },
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 2,
          }}
        />
        
        {/* 작품 정보 */}
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center"
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            {currentContent.title}
          </Typography>

          {/* Chips */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1, 
            mb: 2
          }}>
            {/* 첫 줄: 상태 + 콘텐츠 타입 + 오리지널 */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={currentContent.status}
                size="small"
                {...getStatusChipProps(currentContent.status)}
              />
              <Chip 
                label={contentType === 'webtoon' ? '웹툰' : '웹소설'} 
                color="primary"
                size="small"
              />
              {currentContent.isOriginal && (
                <Chip 
                  label="오리지널"
                  size="small"
                  color="secondary"
                  sx={{ borderRadius: '4px' }}
                />
              )}
            </Box>

            {/* 두 번째 줄: 작가 정보 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentContent.authors.map((author, index) => (
                <Chip 
                  key={index}
                  label={`${author.name}: ${author.role}`}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '4px',
                    '& .MuiChip-label': {
                      px: 1
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
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {currentContent.description}
          </Typography>
        </Box>
      </Box>

      {/* 에피소드 목록 */}
      <Box sx={{ py: 4 }}>  
        <Typography variant="h5" component="h2" gutterBottom>
          에피소드
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {currentContent.episodes.map((episode) => (
            <Box 
              key={episode.id}
              sx={{ 
                display: 'flex',
                gap: 3,
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleEpisodeClick(episode.id)}
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
                  flexShrink: 0
                }}
              />
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                flex: 1
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