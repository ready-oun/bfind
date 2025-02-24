import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ContentDetail from '../pages/Content/Detail'
import EpisodeViewer from '../pages/Content/Episode'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:contentType/:id" element={<ContentDetail />} />
      <Route path="/:contentType/:id/episode/:episodeId" element={<EpisodeViewer />} />
    </Routes>
  )
}