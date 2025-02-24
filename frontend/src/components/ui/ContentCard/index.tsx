import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

interface ContentCardProps {
  title: string
  author: string
  thumbnailUrl: string
  latestEpisode?: string  // 웹툰/웹소설의 최신화
  updateDate?: string     // 업데이트 날짜
  isNew?: boolean        // 신작 표시
}

export default function ContentCard({
  title,
  author,
  thumbnailUrl,
  latestEpisode,
  updateDate,
  isNew
}: ContentCardProps) {
  return (
    <Card 
      sx={{ 
        width: 200,
        bgcolor: 'background.paper',
        position: 'relative'
      }}
    >
      {/* 썸네일 이미지 */}
      <CardMedia
        component="img"
        height={280}
        image={thumbnailUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      
      {/* 신작 뱃지 */}
      {isNew && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'primary.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem'
          }}
        >
          NEW
        </Box>
      )}

      {/* 콘텐츠 정보 */}
      <CardContent>
        <Typography variant="h6" component="h3" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {author}
        </Typography>
        {latestEpisode && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {latestEpisode}
          </Typography>
        )}
        {updateDate && (
          <Typography variant="caption" color="text.secondary" display="block">
            {updateDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
} 