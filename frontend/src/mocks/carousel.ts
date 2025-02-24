export interface CarouselItem {
  id: number
  imageUrl: string
  title: string
  link: string
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/1200x400/png',
    title: '오늘의 추천 1',
    link: '/webtoon/1'
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/1200x400/png',
    title: '오늘의 추천 2',
    link: '/webtoon/2'
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/1200x400/png',
    title: '오늘의 추천 3',
    link: '/novel/1'
  }
] 