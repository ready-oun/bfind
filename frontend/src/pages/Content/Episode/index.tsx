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
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // episodeId로 현재 에피소드 데이터 가져오기
  const currentEpisodeData = useMemo(() => getMockEpisodeData(episodeId!), [episodeId])

  // 스크롤 이벤트 핸들러를 useCallback으로 메모이제이션하고 쓰로틀링 적용
  const handleScroll = useCallback(() => {
    // 현재 스크롤 위치 계산
    const currentScrollY = window.scrollY
    const isAtTop = currentScrollY < 100
    const isAtBottom = 
      window.innerHeight + currentScrollY >= 
      document.documentElement.scrollHeight - 100

    // 최상단이나 최하단일 때만 상태 업데이트
    if (isAtTop || isAtBottom) {
      setShowNavigation(true)
    } else {
      // 중간 위치에서는 네비게이션 숨기기
      setShowNavigation(false)
    }
  }, [])

  // 스크롤 이벤트 리스너에 쓰로틀링 적용
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100); // 100ms 쓰로틀링
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  // 페이지 전환 시 초기화
  useEffect(() => {
    setLoadedImages(new Set());
    window.scrollTo(0, 0);
    setShowNavigation(true); // 초기 상태 설정
  }, [episodeId]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }, [])

  const handleImageClick = useCallback(() => {
    const currentScrollY = window.scrollY
    const isAtTop = currentScrollY < 100
    const isAtBottom = 
      window.innerHeight + currentScrollY >= 
      document.documentElement.scrollHeight - 100

    if (!isAtTop && !isAtBottom) {
      setShowNavigation(prev => !prev)
    }
  }, [])

  // 네비게이션 핸들러
  const handleNavigation = (targetEpisodeId: number | null) => {
    if (targetEpisodeId) {
      // 즉시 페이지 이동
      navigate(`/${contentType}/${id}/episode/${targetEpisodeId}`)
      // 스크롤 위치 초기화
      window.scrollTo(0, 0)
    }
  }

  const isAllImagesLoaded = loadedImages.size === currentEpisodeData.contentImages.length

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
            transition: 'transform 0.2s ease-in-out',  // 부드러운 전환 효과 및 시간 단축
            opacity: showNavigation ? 1 : 0,
            visibility: showNavigation ? 'visible' : 'hidden',  // visibility 추가
            pointerEvents: showNavigation ? 'auto' : 'none',   // pointerEvents 추가
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
            mb: 10, // 네비게이션 하단 위한 최소 여백 설정 
            minHeight: '100vh'  // 최소 높이 설정
          }}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            {currentEpisodeData.contentImages.map((imageUrl, index) => (
              <Box 
                key={`${episodeId}-${index}`}  // 키 값 변경
                position="relative"
                onClick={handleImageClick}
              >
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
                    opacity: loadedImages.has(index) ? 1 : 0, // 로딩 완료 시에만 보이기 
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