import React from 'react'
import { RouterProvider } from 'react-router'

import ErrorBoundary from './components/error-boundary'
import { QueryProvider } from './providers/query-provider'
import router from './router'

const App: React.FC = () => (
  <ErrorBoundary>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </ErrorBoundary>
)
App.displayName = 'App'
export default App
