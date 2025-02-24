import { useParams } from 'react-router-dom'
import { Container, Box, Skeleton, LinearProgress } from '@mui/material'
import { useState } from 'react'

// 임시 더미 데이터
const mockEpisodeData = {
  id: 1,
  title: '1화',
  contentImages: [
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200',
    'https://placehold.co/800x1200'
  ]
}

export default function EpisodeViewer() {
  const { contentType, id, episodeId } = useParams()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  const isAllImagesLoaded = loadedImages.size === mockEpisodeData.contentImages.length

  // 웹툰 뷰어 렌더링
  if (contentType === 'webtoon') {
    return (
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 2,
          px: { xs: 0, sm: 2 },  // 모바일에서는 여백 없이
          bgcolor: 'background.default' 
        }}
      >
        {/* 전체 로딩 프로그레스 바 */}
        {!isAllImagesLoaded && (
          <LinearProgress 
            variant="determinate" 
            value={(loadedImages.size / mockEpisodeData.contentImages.length) * 100}
            sx={{ mb: 2 }}
          />
        )}

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
          {mockEpisodeData.contentImages.map((imageUrl, index) => (
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
    )
  }

  // 웹소설 뷰어는 나중에 구현
  return null
} 