import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import { useState, useRef } from 'react'
import ContentCard from '@/components/ui/ContentCard'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { carouselItems } from '../../mocks/carousel'
// import "slick-carousel/slick/slick-custom.css"

// 더미 데이터 생성 헬퍼 함수
const generateItems = (
  prefix: string, // 제목 접두사 (예: '인기 웹툰', '신작 웹툰', '업데이트 웹툰')
  count: number, // 생성할 아이템 수
  contentType: 'webtoon' | 'novel', // 콘텐츠 타입 (예: 'webtoon', 'novel')
  isNew: boolean = false // 신작 여부 (기본값: false)
) => {
  return Array.from({ length: count }, (_, i) => ({
    // length: count로 빈 배열 생성, 각 요소마다 콜백 함수 실행
    id: i + 1, // 아이템 고유 ID 1부터 시작 
    title: `${prefix} ${i + 1}`, // 아이템 제목
    author: `작가${i + 1}`, // 아이템 저자
    thumbnailUrl: 'https://placehold.co/200x280', // 아이템 썸네일 이미지 주소
    contentType,  // contentType 추가
    // 신작이 아닐 경우에만 최신화와 업데이트 날짜 표시
    ...((!isNew) && {
      // isNew가 false일 때만 아래 정보 추가
      latestEpisode: `${Math.floor(Math.random() * 100 + 1)}화`, // 최신화 정보 (1~100 사이 랜덤 화수)
      updateDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // 업데이트 날짜 // 최근 7일 내 랜덤 날짜를 "월.일" 형식으로
        .toLocaleDateString('ko-KR', { 
          month: 'numeric', 
          day: 'numeric' 
        })
    }),
    isNew
  }))
}

// 테스트용 데이터
const mockWebtoons = {
  popular: generateItems('인기 웹툰', 12, 'webtoon', false),  // 일반 콘텐츠
  new: generateItems('신작 웹툰', 8, 'webtoon', true),      // 신작
  updated: generateItems('업데이트 웹툰', 15, 'webtoon', false)  // 일반 콘텐츠
}

const mockNovels = {
  popular: generateItems('인기 웹소설', 10, 'novel', false),
  new: generateItems('신작 웹소설', 6, 'novel', true),
  updated: generateItems('업데이트 웹소설', 20, 'novel', false)
}

// DEBUG 위한 콘솔 로그 추가
console.log('mockWebtoons.updated[0]:', mockWebtoons.updated[0])
console.log('mockNovels.updated[0]:', mockNovels.updated[0])

// ContentList 컴포넌트 수정
function ContentList({ items }: { items: any[] }) {
  const [isDragging, setIsDragging] = useState(false) // 드래그 상태 관리
  const [startX, setStartX] = useState(0) // 드래그 시작 위치
  const [scrollLeft, setScrollLeft] = useState(0) // 스크롤 위치
  const containerRef = useRef<HTMLDivElement>(null) // 컨테이너 참조

  const displayItems = items.slice(0, Math.max(4, Math.min(items.length, 20))) // 최소 4개, 최대 20개로 제한

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => { 
    setIsDragging(true) // 드래그 시작
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0)) // 드래그 시작 위치 설정
    setScrollLeft(containerRef.current?.scrollLeft || 0) // 스크롤 위치 설정
  }

  // 마우스 이동 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return // 드래그 상태가 아니면 리턴
    e.preventDefault() // 기본 동작 방지
    const x = e.pageX - (containerRef.current?.offsetLeft || 0) // 마우스 위치 계산
    const walk = (x - startX) * 2 // 스크롤 속도 조절
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk // 스크롤 위치 업데이트
    }
  }

  // 마우스 업 이벤트 핸들러
  const handleMouseUp = () => {
    setIsDragging(false) // 드래그 상태 종료
  }

  return (
    // 컨테이너 요소
    <Box
      ref={containerRef}
      sx={{
        display: 'flex', // 요소 모음 표시
        gap: 2, // 요소 간격
        overflowX: 'auto', // 가로 스크롤 표시
        pb: 2, // 요소 아래 여백
        // 스크롤바 요소
        '&::-webkit-scrollbar': {
          height: 8, // 스크롤바 높이
        },
        // 스크롤바 트랙 요소
        '&::-webkit-scrollbar-track': {
          bgcolor: 'background.paper', // 스크롤바 배경색
        },
        // 스크롤바 썸네일 요소
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'primary.main', // 스크롤바 색상
          borderRadius: 2, // 스크롤바 모서리 둥글게
        },
        // 스크롤바 너비
        scrollbarWidth: 'none', // 스크롤바 너비 설정 ( 다른 옵션: 'none', 'thin', 'auto' )
        scrollbarColor: 'primary.main background.paper', // 스크롤바 색상과 배경색 ( 다른 옵션:)
        cursor: isDragging ? 'grabbing' : 'grab', // 드래그 중 커서 표시
        userSelect: 'none', // 드래그 중 텍스트 선택 방지 ( 다른 옵션: )
      }}
      onMouseDown={handleMouseDown} // 마우스 다운 이벤트 핸들러 (마우스 버튼을 누를 때 : 드래그를 시작하는 시점)    
      onMouseMove={handleMouseMove} // 마우스 이동 이벤트 핸들러 (마우스를 움직일 때 : 드래그를 하는 동안)
      onMouseUp={handleMouseUp} // 마우스 업 이벤트 핸들러 (마우스 버튼을 놓을 때 : 드래그를 종료하는 시점)
      onMouseLeave={handleMouseUp} // 마우스 떠날 때 이벤트 핸들러 (마우스가 요소를 벗어날 때 : 드래그를 종료하는 시점)
    >
      {displayItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            flexShrink: 0, // 컨테이너 줄어들지 않도록 설정     
          }}
        >
          <ContentCard {...item} /> 
        </Box>
      ))}
    </Box>
  )
}

// 화살표 컴포넌트 수정
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
      width: 40,
      height: 40,
      display: 'none',  // 기본적으로 숨김
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '50%',
      color: 'white',
      transition: 'background-color 0.2s',
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.5)'
      }
    }}
  >
    <ArrowForward sx={{ fontSize: 24 }} />
  </Box>
)

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
      width: 40,
      height: 40,
      display: 'none',  // 기본적으로 숨김
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '50%',
      color: 'white',
      transition: 'background-color 0.2s',
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.5)'
      }
    }}
  >
    <ArrowBack sx={{ fontSize: 24 }} />
  </Box>
)

export default function Home() {
  const [categoryTab, setCategoryTab] = useState(0) // 카테고리 탭 상태 관리

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setCategoryTab(newValue) // 카테고리 탭 상태 업데이트
  }

  const currentData = categoryTab === 0 ? mockWebtoons : mockNovels // 현재 선택된 카테고리 데이터 설정

  const settings = {
    dots: true,  // 하단 점 표시
    dotsClass: 'slick-dots',  // 기본 dots 클래스 사용
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // 3개 동시 표시
    slidesToScroll: 3,  // 3개씩 스크롤
    autoplay: false,  // 자동 재생 비활성화
    arrows: false,  // 화살표 비활성화
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <Container maxWidth="lg">
      <Container>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Today's Recommendation
        </Typography>

        <Box 
          sx={{ 
            mb: 4,
            '& .slick-track': {
              display: 'flex',
              gap: 2  // 슬라이드 간 간격
            },
            '& .slick-slide': {
              height: 'auto'  // 높이 자동 조정
            },
            '& .slick-dots': {
              bottom: -30,
              '& li': {
                margin: 0,
                '& button:before': {
                  fontSize: 8,
                  color: 'grey.400'
                }
              },
              '& li.slick-active button:before': {
                color: 'primary.main'
              }
            }
          }}
        >
          <Slider {...settings}>
            {carouselItems.map((item) => (
              <Box 
                key={item.id}
                component="a"
                href={item.link}
                sx={{
                  display: 'block !important',  // !important로 슬라이더 스타일 오버라이드
                  position: 'relative',
                  aspectRatio: '3/4',  // 세로로 긴 비율
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,  // 그림자 효과
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'  // 호버 시 위로 살짝 떠오르는 효과
                  }
                }}
              >
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* 카테고리 탭 섹션 */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={categoryTab} 
            onChange={handleCategoryChange}
            aria-label="content category tabs"
          >
            <Tab label="웹툰" />
            <Tab label="웹소설" />
          </Tabs>
        </Box>

        {/* 인기 섹션 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            인기 {categoryTab === 0 ? '웹툰' : '웹소설'}
          </Typography>
          <ContentList items={currentData.popular} />
        </Box>

        {/* 신작 섹션 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            신작 {categoryTab === 0 ? '웹툰' : '웹소설'}
          </Typography>
          <ContentList items={currentData.new} />
        </Box>

        {/* 업데이트 섹션 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            업데이트된 {categoryTab === 0 ? '웹툰' : '웹소설'}
          </Typography>
          <ContentList items={currentData.updated} />
        </Box>
      </Container>
    </Container>
  )
}

// TODO: [홈 페이지]
// - 메인 배너 슬라이더 구현
// - 최근 본 작품 섹션 추가
// - 장르별 추천 작품 로직 구현
// - 실시간 인기 작품 순위 표시
// - 사용자 맞춤 추천 시스템 연동
// - 무한 스크롤 또는 페이지네이션 구현
// - 스켈레톤 로딩 UI 적용
// - SEO 최적화
