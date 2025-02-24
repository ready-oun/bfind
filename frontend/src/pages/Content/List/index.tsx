import { useState } from 'react'
import { 
  Container, 
  Tabs, 
  Tab, 
  Box, 
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockWebtoons, mockNovels, ContentItem, ContentStatus } from '../../../mocks/contents'

// TODO: [작품 목록/상세]
// - 작품 필터링 및 정렬 기능
// - 작품 검색 자동완성
// - 작품 평점/리뷰 시스템
// - 좋아요/북마크 기능
// - 공유하기 기능
// - 연재 알림 설정
// - 작품 신고하기
// - 성인 인증 로직 

// 상태별 Chip 색상 설정
const getStatusChipColor = (status: ContentStatus) => {
  switch (status) {
    case '신작':
    case '무료공개':
      return 'primary'
    case '연재중':
      return 'success'
    case '완결':
      return 'default'
    case '휴재중':
      return 'warning'
    default:
      return 'default'
  }
}

interface ContentListProps {
  contentType: 'webtoon' | 'novel'  // contentType이 필수 prop으로 되어있을 것 같네요
  contents: ContentItem[]
}

export default function ContentList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState<'webtoon' | 'novel'>(
    location.pathname.includes('novel') ? 'novel' : 'webtoon'
  )

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'webtoon' | 'novel') => {
    setCurrentTab(newValue)
    navigate(`/${newValue}`)
  }

  const currentList = currentTab === 'webtoon' ? mockWebtoons.all : mockNovels.all
  
  // 데이터 확인용 로그
  console.log('Current Tab:', currentTab)
  console.log('Current List:', currentList)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          centered
        >
          <Tab label="웹툰" value="webtoon" />
          <Tab label="웹소설" value="novel" />
        </Tabs>
      </Box>

      {/* 콘텐츠 그리드 */}
      <Grid container spacing={3}>
        {currentList.map((item: ContentItem) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
              onClick={() => navigate(`/${currentTab}/${item.id}`)}
            >
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
                sx={{ 
                  height: 280,
                  objectFit: 'cover'
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.authors.map(author => author.name).join(', ')}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
                  <Chip 
                    label={item.status} 
                    size="small"
                    color={getStatusChipColor(item.status)}
                  />
                  {item.isOriginal && (
                    <Chip 
                      label="오리지널" 
                      size="small" 
                      color="secondary"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
