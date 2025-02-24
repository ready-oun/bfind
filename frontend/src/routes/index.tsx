import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ContentDetail from '../pages/Content/Detail'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:contentType/:id" element={<ContentDetail />} />
    </Routes>
  )
}