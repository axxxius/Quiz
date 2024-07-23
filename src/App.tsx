import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from '@utils'

import { appRouter } from './navigation/app.router.tsx'

export const App = () => (
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
)
