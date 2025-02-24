import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout'
import Home from '../pages/Home'
import ContentDetail from '../pages/Content/Detail'
import ContentList from '../pages/Content/List'
import EpisodeViewer from '../pages/Content/Episode'
import Search from '../pages/Search'
import Payment from '@/pages/Payment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: ':contentType',
        element: <ContentList />
      },
      {
        path: ':contentType/:id',
        element: <ContentDetail />
      },
      {
        path: ':contentType/:id/episode/:episodeId',
        element: <EpisodeViewer />
      },
      {
        path: 'payment',
        element: <Payment />
      }
    ]
  }
])