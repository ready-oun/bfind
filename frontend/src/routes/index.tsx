import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ContentDetail from '../pages/Content/Detail'
import EpisodeViewer from '../pages/Content/Episode'
import ContentList from '../pages/Content/List'
import Layout from '@/components/layout'

export default function AppRoutes() {
  return (
    <Routes>
        {/* 뷰어 페이지는 레이아웃 제외 */}
        <Route path="/:contentType/:id/episode/:episodeId" element={<EpisodeViewer />} />
        
        {/* 나머지 페이지는 레이아웃 포함 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/webtoon" element={<ContentList />} />
          <Route path="/novel" element={<ContentList />} />
          <Route path="/:contentType/:id" element={<ContentDetail />} />
        </Route>
    </Routes>
  )
}