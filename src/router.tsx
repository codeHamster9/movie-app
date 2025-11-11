import { createBrowserRouter } from 'react-router'

import ErrorBoundary from './components/error-boundary'
import Layout from './components/Layout/Layout'
import MoviesPage from './pages/movies'
import Notfound from './pages/Notfound'

const BASE_PATH = '/movie-app';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ErrorBoundary>
          <MoviesPage />
        </ErrorBoundary>
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <Notfound />
      </Layout>
    ),
  },
],{
  basename: BASE_PATH,
})

export default router
