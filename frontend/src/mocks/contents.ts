// 에피소드 타입 정의
interface Episode {
  id: number
  title: string
  date: string
  thumbnail: string
}

// 콘텐츠 타입 정의
export interface ContentItem {
  id: number
  title: string
  authors: Array<{ name: string; role: string }>
  description: string
  thumbnail: string
  status: ContentStatus
  isOriginal: boolean
  contentType: 'webtoon' | 'novel'
  genre: string[]
  views: number
  rating: number
  updatedAt: string
  episodes: Episode[]
}

export type ContentStatus = '연재중' | '완결' | '휴재중' | '무료공개' | '신작'

// Mock 데이터
export const mockWebtoons = {
  all: [
    {
      id: 1,
      title: '드래곤의 길',
      authors: [{ name: '김용룡', role: '글/그림' }],
      description: '평범한 고등학생이 드래곤의 힘을 계승받아 성장하는 판타지 이야기',
      thumbnail: 'https://placehold.co/400x600',
      status: '연재중' as ContentStatus,
      isOriginal: true,
      contentType: 'webtoon' as const,
      genre: ['판타지', '액션'],
      views: 1500000,
      rating: 4.8,
      updatedAt: '2024-02-01',
      episodes: Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화 - ${i === 0 ? '운명의 시작' : `드래곤의 길 ${i + 1}`}`,
        date: new Date(2024, 0, 1 + i * 7).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 2,
      title: '일상 로맨스',
      authors: [
        { name: '이그림', role: '그림' },
        { name: '박글글', role: '스토리' }
      ],
      description: '직장인들의 달콤쌉싸름한 로맨스',
      thumbnail: 'https://placehold.co/400x600',
      status: '신작' as ContentStatus,
      isOriginal: true,
      contentType: 'webtoon' as const,
      genre: ['로맨스', '일상'],
      views: 980000,
      rating: 4.6,
      updatedAt: '2024-02-15',
      episodes: Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화 - 일상의 설렘`,
        date: new Date(2024, 0, 1 + i * 7).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 3,
      title: '좀비 서바이벌',
      authors: [{ name: '강생존', role: '글/그림' }],
      description: '갑작스러운 좀비 사태 속 살아남기 위한 사람들의 이야기',
      thumbnail: 'https://placehold.co/400x600',
      status: '완결' as ContentStatus,
      isOriginal: false,
      contentType: 'webtoon' as const,
      genre: ['스릴러', '액션'],
      views: 2500000,
      rating: 4.9,
      updatedAt: '2023-12-30',
      episodes: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화`,
        date: new Date(2023, 0, 1 + i * 7).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 4,
      title: '학교의 비밀',
      authors: [{ name: '정미스터리', role: '글/그림' }],
      description: '평범해 보이는 고등학교에 숨겨진 기이한 현상들',
      thumbnail: 'https://placehold.co/400x600',
      status: '연재중' as ContentStatus,
      isOriginal: true,
      contentType: 'webtoon' as const,
      genre: ['미스터리', '스릴러'],
      views: 1000000,
      rating: 4.7,
      updatedAt: '2024-02-15',
      episodes: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화`,
        date: new Date(2024, 0, 1 + i * 7).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 5,
      title: '요리의 신',
      authors: [{ name: '김셰프', role: '글/그림' }],
      description: '요리로 세상을 정복하는 천재 요리사의 이야기',
      thumbnail: 'https://placehold.co/400x600',
      status: '무료공개' as ContentStatus,
      isOriginal: true,
      contentType: 'webtoon' as const,
      genre: ['요리', '드라마'],
      views: 800000,
      rating: 4.6,
      updatedAt: '2024-02-15',
      episodes: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화`,
        date: new Date(2024, 0, 1 + i * 7).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    // ... 더 추가
  ] as ContentItem[]
}

export const mockNovels = {
  all: [
    {
      id: 1,
      title: '마법사의 제자',
      authors: [{ name: '최마법', role: '글' }],
      description: '천재 마법사의 유일한 제자가 되어 성장하는 이야기',
      thumbnail: 'https://placehold.co/400x600',
      status: '연재중' as ContentStatus,
      isOriginal: true,
      contentType: 'novel' as const,
      genre: ['판타지', '무협'],
      views: 800000,
      rating: 4.7,
      updatedAt: '2024-02-14',
      episodes: Array.from({ length: 156 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화 - 마법의 시작`,
        date: new Date(2023, 6, 1 + i * 2).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 2,
      title: '로맨스 인 시티',
      authors: [{ name: '한사랑', role: '글' }],
      description: '도시에서 펼쳐지는 달콤한 로맨스',
      thumbnail: 'https://placehold.co/400x600',
      status: '신작' as ContentStatus,
      isOriginal: true,
      contentType: 'novel' as const,
      genre: ['로맨스', '드라마'],
      views: 650000,
      rating: 4.5,
      updatedAt: '2024-02-13',
      episodes: Array.from({ length: 89 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화`,
        date: new Date(2023, 9, 1 + i * 3).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 3,
      title: '회귀한 천재 과학자',
      authors: [{ name: '박타임', role: '글' }],
      description: '실패한 미래에서 과거로 돌아온 천재 과학자의 세상 구하기',
      thumbnail: 'https://placehold.co/400x600',
      status: '무료공개' as ContentStatus,
      isOriginal: false,
      contentType: 'novel' as const,
      genre: ['SF', '판타지'],
      views: 1200000,
      rating: 4.9,
      updatedAt: '2024-02-15',
      episodes: Array.from({ length: 234 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화`,
        date: new Date(2023, 3, 1 + i * 2).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 4,
      title: '이세계 레스토랑',
      authors: [{ name: '이판타지', role: '글' }],
      description: '현대 요리로 이세계를 사로잡다',
      thumbnail: 'https://placehold.co/400x600',
      status: '휴재중' as ContentStatus,
      isOriginal: true,
      contentType: 'novel' as const,
      genre: ['판타지', '요리'],
      views: 750000,
      rating: 4.6,
      updatedAt: '2024-02-15',
      episodes: Array.from({ length: 89 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화 - 이세계의 맛`,
        date: new Date(2023, 9, 1 + i * 3).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    {
      id: 5,
      title: '천하제일 의술',
      authors: [{ name: '한의원', role: '글' }],
      description: '조선 최고의 의원이 되기 위한 여의사의 도전',
      thumbnail: 'https://placehold.co/400x600',
      status: '완결' as ContentStatus,
      isOriginal: true,
      contentType: 'novel' as const,
      genre: ['무협', '의학'],
      views: 680000,
      rating: 4.7,
      updatedAt: '2024-02-14',
      episodes: Array.from({ length: 156 }, (_, i) => ({
        id: i + 1,
        title: `${i + 1}화 - 의술의 길`,
        date: new Date(2023, 8, 1 + i * 2).toLocaleDateString(),
        thumbnail: 'https://placehold.co/200x200'
      }))
    },
    // ... 계속
  ] as ContentItem[]
} 