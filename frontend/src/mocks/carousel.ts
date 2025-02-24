export interface CarouselItem {
  id: number
  imageUrl: string
  title: string
  link: string
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/1280x400/FF6B6B/white?text=Today%27s+Recommendation+1',
    title: "Today's Recommendation 1",
    link: '/webtoon/1'
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/1280x400/4ECDC4/white?text=Today%27s+Recommendation+2',
    title: "Today's Recommendation 2",
    link: '/webtoon/2'
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/1280x400/45B7D1/white?text=Today%27s+Recommendation+3',
    title: "Today's Recommendation 3",
    link: '/novel/1'
  }
] 
