import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Skeleton, LinearProgress, IconButton, Paper } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useState, useEffect, useMemo, useCallback } from 'react'

// 임시 더미 데이터를 함수로 변경
const getMockEpisodeData = (episodeId: string) => ({
  id: parseInt(episodeId),
  title: `${episodeId}화`,
  contentImages: Array(30).fill(0).map(() => 'https://placehold.co/800x1200'),  // 이미지 개수 증가
  hasPrevious: parseInt(episodeId) > 1,
  hasNext: parseInt(episodeId) < 10,
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
  
  const currentEpisodeData = getMockEpisodeData(episodeId!)

  // handleNavigation 함수를 useCallback으로 메모이제이션
  const handleNavigation = useCallback((targetEpisodeId: number | null) => {
    if (targetEpisodeId === null) return;
    navigate(`/${contentType}/${id}/episode/${targetEpisodeId}`);
  }, [contentType, id, navigate]);  // 의존성 배열에 필요한 값들만 포함

  // 스크롤 이벤트 핸들러 (쓰로틀링 유지)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isAtTop = currentScrollY < 100
      const isAtBottom = 
        window.innerHeight + currentScrollY >= 
        document.documentElement.scrollHeight - 100

      if (isAtTop || isAtBottom) {
        setShowNavigation(true)
      } else {
        setShowNavigation(false)
      }
    }

    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  // 페이지 전환 시 초기화
  useEffect(() => {
    setLoadedImages(new Set())
    window.scrollTo(0, 0)
    setShowNavigation(true)
  }, [episodeId])

  // 이미지 로딩 핸들러 단순화
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      if (prev.has(index)) return prev;
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }

  const isAllImagesLoaded = loadedImages.size === currentEpisodeData.contentImages.length

  return contentType === 'webtoon' ? (
    <>
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
          transition: 'transform 0.2s ease-in-out',
          opacity: showNavigation ? 1 : 0,
          visibility: showNavigation ? 'visible' : 'hidden',
          pointerEvents: showNavigation ? 'auto' : 'none',
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

      <Container 
        maxWidth="md" 
        sx={{ 
          py: 2,
          px: { xs: 0, sm: 2 },
          bgcolor: 'background.default',
          mb: 10,
          minHeight: '100vh'
        }}
      >
        {!isAllImagesLoaded && (
          <LinearProgress 
            variant="determinate" 
            value={(loadedImages.size / currentEpisodeData.contentImages.length) * 100}
            sx={{ mb: 2 }}
          />
        )}

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
          {currentEpisodeData.contentImages.map((imageUrl, index) => (
            <Box 
              key={`${episodeId}-${index}`}
              sx={{ position: 'relative' }}
            >
              {!loadedImages.has(index) && (
                <Skeleton 
                  variant="rectangular" 
                  width="100%"
                  height={600}
                  animation="wave"
                />
              )}
              <Box
                component="img"
                src={imageUrl}
                alt={`컷 ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxWidth: '100%',
                  opacity: loadedImages.has(index) ? 1 : 0,
                  visibility: loadedImages.has(index) ? 'visible' : 'hidden',
                  position: 'relative',  // position을 항상 relative로 고정
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  ) : null
} 