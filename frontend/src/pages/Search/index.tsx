import { useState } from 'react'
import { Container, TextField, Box, Typography } from '@mui/material'
import { mockWebtoons, mockNovels } from '../../mocks/contents'
import ContentCard from '../../components/ui/ContentCard'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // 모든 콘텐츠를 대상으로 검색
  const searchResults = [...mockWebtoons.all, ...mockNovels.all]
    .filter(content => 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.authors.some(author => 
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .map(content => ({
      ...content,
      // ContentCard에 필요한 형식으로 데이터 변환
      author: content.authors.map(a => a.name).join(', '),
      thumbnailUrl: content.thumbnail,
      contentType: content.type === 'webtoon' ? 'webtoon' : 'novel'
    }))

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

        {/* 검색 결과 */}
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
                  {...content}
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