import { useState, useMemo } from 'react'
import { Container, TextField, Box, Typography } from '@mui/material'
import { mockWebtoons, mockNovels } from '../../mocks/contents'
import ContentCard from '../../components/ui/ContentCard'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // 웹툰과 소설 데이터를 한 번만 결합
  const allContents = useMemo(() => [
    ...mockWebtoons.all.map(content => ({ ...content, type: 'webtoon' })),
    ...mockNovels.all.map(content => ({ ...content, type: 'novel' }))
  ], [])
  
  const searchResults = useMemo(() => 
    allContents
      .filter(content => 
        content.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.authors?.some(author => 
          author.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .map(content => ({
        id: content.id,
        title: content.title || '',
        author: Array.isArray(content.authors) 
          ? content.authors.map(a => a.name).filter(Boolean).join(', ') 
          : '작가미상',
        thumbnailUrl: content.thumbnail || 'https://placehold.co/200x280',
        contentType: content.type || 'novel',
        isNew: false,
      })), [searchQuery, allContents])

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="제목, 작가를 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          sx={{ mb: 4 }}
        />

        {searchQuery ? (
          searchResults.length > 0 ? (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 2 
            }}>
              {searchResults.map((content) => (
                <ContentCard 
                  key={`${content.contentType}-${content.id}`}
                  id={content.id}
                  title={content.title}
                  author={content.author}
                  thumbnailUrl={content.thumbnailUrl}
                  contentType={content.contentType as 'webtoon' | 'novel'}
                  isNew={content.isNew}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              검색 결과가 없습니다.
            </Typography>
          )
        ) : (
          <Typography variant="body1" color="text.secondary" align="center">
            검색어를 입력해주세요.
          </Typography>
        )}
      </Box>
    </Container>
  )
} 

// TODO: [검색]
// - 실시간 검색어 순위
// - 검색어 자동완성
// - 상세 검색 필터
// - 검색 히스토리 관리
// - 태그 기반 검색
// - 음성 검색 지원
// - 검색 결과 정렬 옵션
// - 연관 검색어 추천 