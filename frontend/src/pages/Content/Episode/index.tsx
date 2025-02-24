import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Skeleton, LinearProgress, IconButton, Paper } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useState, useEffect } from 'react'

// 임시 더미 데이터를 함수로 변경
const getMockEpisodeData = (episodeId: string) => ({
  id: parseInt(episodeId),
  title: `${episodeId}화`,
  contentImages: [
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200'
  ],
  hasPrevious: parseInt(episodeId) > 1,  // 1화보다 크면 이전화 있음
  hasNext: parseInt(episodeId) < 10,      // 10화보다 작으면 다음화 있음 - 실제로는 API에서 전체 에피소드 수를 받아와서 처리
  prevEpisodeId: parseInt(episodeId) > 1 ? parseInt(episodeId) - 1 : null,
  nextEpisodeId: parseInt(episodeId) < 10 ? parseInt(episodeId) + 1 : null // 실제로는 API에서 전체 에피소드 수를 받아와서 처리
})

export default function EpisodeViewer() {
  const { contentType, id, episodeId } = useParams<{
    contentType: string;
    id: string;
    episodeId: string;
  }>()
  const navigate = useNavigate()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [showNavigation, setShowNavigation] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // episodeId로 현재 에피소드 데이터 가져오기
  const currentEpisodeData = getMockEpisodeData(episodeId!)
//   const currentEpisodeData = getMockEpisodeData(episodeId as string)  // as string으로 타입 단언

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  // 네비게이션 핸들러
  const handleNavigation = (targetEpisodeId: number | null) => {
    if (targetEpisodeId) {
      navigate(`/${contentType}/${id}/episode/${targetEpisodeId}`)
    }
  }

  const isAllImagesLoaded = loadedImages.size === currentEpisodeData.contentImages.length

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isAtTop = currentScrollY < 100
      const isAtBottom = 
        window.innerHeight + currentScrollY >= 
        document.documentElement.scrollHeight - 100

      // 최상단이나 최하단일 때만 네비게이션 표시
      setShowNavigation(isAtTop || isAtBottom)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // 이미지 로딩 시 Set 초기화 (페이지 전환 시)
  useEffect(() => {
    setLoadedImages(new Set())
  }, [episodeId])

  // 웹툰 뷰어 렌더링
  if (contentType === 'webtoon') {
    return (
      <>
        {/* 네비게이션 바 - 조건부 표시 */}
        <Paper 
          elevation={3}
          sx={{ 
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: `translateX(-50%) translateY(${showNavigation ? 0 : '100px'})`,
            display: 'flex',
            gap: 2,
            p: 1,
            borderRadius: 5,
            bgcolor: 'background.paper',
            zIndex: 1000,
            transition: 'transform 0.3s ease-in-out',  // 부드러운 전환 효과
            opacity: showNavigation ? 1 : 0,
          }}
        >
          <IconButton 
            onClick={() => handleNavigation(currentEpisodeData.prevEpisodeId)}
            disabled={!currentEpisodeData.hasPrevious}
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={() => handleNavigation(currentEpisodeData.nextEpisodeId)}
            disabled={!currentEpisodeData.hasNext}
          >
            <ArrowForward />
          </IconButton>
        </Paper>

        {/* 전체 로딩 프로그레스 바 */}
        {!isAllImagesLoaded && (
          <LinearProgress 
            variant="determinate" 
            value={(loadedImages.size / currentEpisodeData.contentImages.length) * 100}
            sx={{ mb: 2 }}
          />
        )}

        <Container 
          maxWidth="md" 
          sx={{ 
            py: 2,
            px: { xs: 0, sm: 2 },  // 모바일에서는 여백 없이
            bgcolor: 'background.default',
            mb: 10  // 네비게이션 바를 위한 하단 여백
          }}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            {currentEpisodeData.contentImages.map((imageUrl, index) => (
              <Box key={index} position="relative">
                {/* 스켈레톤 UI (이미지 로딩 전) */}
                {!loadedImages.has(index) && (
                  <Skeleton 
                    variant="rectangular" 
                    width="100%"
                    height={600}
                    animation="wave"
                  />
                )}
                
                {/* 실제 이미지 */}
                <Box
                  component="img"
                  src={imageUrl}
                  alt={`컷 ${index + 1}`}
                  onLoad={() => handleImageLoad(index)}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    maxWidth: '100%',
                    opacity: loadedImages.has(index) ? 1 : 0,  // 로딩 완료 시에만 보이기
                    position: loadedImages.has(index) ? 'relative' : 'absolute',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </>
    )
  }

  // 웹소설 뷰어는 나중에 구현
  return null
} 