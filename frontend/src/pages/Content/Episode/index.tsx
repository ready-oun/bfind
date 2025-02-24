import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Skeleton, LinearProgress, IconButton, Paper, Typography, Button, AppBar, Toolbar } from '@mui/material'
import { ArrowBack, ArrowForward, Home as HomeIcon, List as ListIcon, Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

// 이미지 URL을 미리 생성해서 재사용
const MOCK_IMAGES = Array(30).fill('https://placehold.co/800x1200')

// 데이터 생성 함수 수정
const getMockEpisodeData = (episodeId: string) => {
  const id = parseInt(episodeId)
  return {
    id,
    title: `${id}화`,
    contentImages: MOCK_IMAGES,  // 미리 생성된 배열 재사용
    hasPrevious: id > 1,
    hasNext: id < 10,
    prevEpisodeId: id > 1 ? id - 1 : null,
    nextEpisodeId: id < 10 ? id + 1 : null
  }
}

export default function EpisodeViewer() {
  const { contentType, id, episodeId } = useParams<{
    contentType: string;
    id: string;
    episodeId: string;
  }>()
  const navigate = useNavigate()
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const [showNavigation, setShowNavigation] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const imageCache = useRef<Set<string>>(new Set())
  const isLoadingComplete = useRef<boolean>(false)
  const navigationTimeoutRef = useRef<number | undefined>(undefined)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const currentEpisodeData = useMemo(() => 
    getMockEpisodeData(episodeId!),
    [episodeId]
  )

  // 페이지 전환 시 초기화
  useEffect(() => {
    setLoadedImages([])
    isLoadingComplete.current = false
    window.scrollTo(0, 0)
  }, [episodeId])

  // 이미지 프리로딩 에러 처리 추가
  useEffect(() => {
    const preloadImages = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const images = currentEpisodeData.contentImages.map((url, index) => {
          if (imageCache.current.has(`${episodeId}-${url}`)) {
            handleImageLoad(index)
            return null
          }
          
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
              imageCache.current.add(`${episodeId}-${url}`)
              handleImageLoad(index)
              resolve(null)
            }
            img.onerror = () => reject(new Error(`Failed to load image ${index}`))
            img.src = url
          })
        })

        await Promise.all(images.filter(Boolean))
        setIsLoading(false)
      } catch (err) {
        setError('이미지를 불러오는 중 오류가 발생했습니다.')
        setIsLoading(false)
      }
    }

    preloadImages()
  }, [currentEpisodeData.contentImages, episodeId])

  // 이미지 로드 핸들러
  const handleImageLoad = useCallback((index: number) => {
    if (isLoadingComplete.current) return
    
    setLoadedImages(prev => {
      if (prev.includes(index)) return prev
      const newImages = [...prev, index].sort((a, b) => a - b)
      
      if (newImages.length === currentEpisodeData.contentImages.length) {
        isLoadingComplete.current = true
      }
      
      return newImages
    })
  }, [currentEpisodeData.contentImages.length])

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isAtTop = currentScrollY < 100
      const isAtBottom = 
        window.innerHeight + currentScrollY >= 
        document.documentElement.scrollHeight - 100

      setShowNavigation(isAtTop || isAtBottom)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 이미지 클릭/터치 핸들러
  const handleImageInteraction = useCallback(() => {
    setShowNavigation(prev => !prev)
    
    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current)
    }
    
    navigationTimeoutRef.current = window.setTimeout(() => {
      setShowNavigation(false)
    }, 3000)
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current)
      }
    }
  }, [])

  // 네비게이션 핸들러
  const handleNavigation = useCallback((targetEpisodeId: number | null) => {
    if (!targetEpisodeId) return
    navigate(`/${contentType}/${id}/episode/${targetEpisodeId}`)
  }, [contentType, id, navigate])

  // 키보드 이벤트 핸들러 추가
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
          // 이전화
          if (currentEpisodeData.hasPrevious) {
            handleNavigation(currentEpisodeData.prevEpisodeId)
          }
          break;
        case 'ArrowRight':
          // 다음화
          if (currentEpisodeData.hasNext) {
            handleNavigation(currentEpisodeData.nextEpisodeId)
          }
          break;
        case ' ':  // 스페이스바
          // 한 페이지 스크롤
          window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: 'smooth'
          })
          break;
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentEpisodeData, handleNavigation])

  if (contentType !== 'webtoon') return null
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2 
          }}
        >
          <Typography color="error">{error}</Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
          >
            다시 시도
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        {/* 상단 네비게이션 바 수정 */}
        <AppBar 
          position="fixed" 
          elevation={4}
          sx={{ 
            top: 0,
            backgroundColor: 'background.paper',  // theme의 background.paper 사용
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s',
            transform: showNavigation ? 'translateY(0)' : 'translateY(-100%)',
            zIndex: 1200,
          }}
        >
          <Toolbar sx={{ minHeight: 56 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ flex: 1, fontWeight: 500, color: 'text.primary' }}  // theme의 text.primary 사용
            >
              {currentEpisodeData.title}
            </Typography>
            
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ color: 'text.primary' }}  // theme의 text.primary 사용
            >
              <HomeIcon />
            </IconButton>
            
            <IconButton 
              onClick={() => navigate(`/${contentType}/${id}`)}
              sx={{ color: 'text.primary' }}
            >
              <ListIcon />
            </IconButton>
            
            <IconButton 
              onClick={() => setIsBookmarked(prev => !prev)}
              sx={{ color: 'text.primary' }}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* 하단 네비게이션도 동일하게 수정 */}
        <Paper 
          elevation={4}
          sx={{ 
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: `translateX(-50%) translateY(${showNavigation ? 0 : '100px'})`,
            display: 'flex',
            gap: 2,
            p: 1,
            borderRadius: 5,
            backgroundColor: 'background.paper',  // theme의 background.paper 사용
            backdropFilter: 'blur(8px)',
            zIndex: 1200,
            transition: 'transform 0.2s ease-in-out',
            opacity: showNavigation ? 1 : 0,
          }}
        >
          <IconButton 
            onClick={() => handleNavigation(currentEpisodeData.prevEpisodeId)}
            disabled={!currentEpisodeData.hasPrevious}
            sx={{ color: 'text.primary' }}  // theme의 text.primary 사용
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={() => handleNavigation(currentEpisodeData.nextEpisodeId)}
            disabled={!currentEpisodeData.hasNext}
            sx={{ color: 'text.primary' }}  // theme의 text.primary 사용
          >
            <ArrowForward />
          </IconButton>
        </Paper>

        {/* 콘텐츠 영역 */}
        {isLoading && loadedImages.length < currentEpisodeData.contentImages.length && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={(loadedImages.length / currentEpisodeData.contentImages.length) * 100}
              sx={{ 
                mb: 2,
                height: 8,
                borderRadius: 1
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
            >
              이미지 로딩 중... ({loadedImages.length}/{currentEpisodeData.contentImages.length})
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {currentEpisodeData.contentImages.map((imageUrl, index) => (
            <Box 
              key={`${episodeId}-${index}`}
              sx={{ 
                position: 'relative',
                // cursor: 'none' // 다른 옵션 : 'pointer'
              }}
              onClick={handleImageInteraction}
              onTouchStart={handleImageInteraction}
            >
              {!loadedImages.includes(index) && (
                <Skeleton 
                  variant="rectangular" 
                  width="100%"
                  height={600}
                  animation="wave"
                />
              )}
              <img
                src={imageUrl}
                alt={`컷 ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  opacity: loadedImages.includes(index) ? 1 : 0,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
} 