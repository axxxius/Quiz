import { RouterProvider } from 'react-router-dom'

import { appRouter } from './navigation/app.router.tsx'
import AuthProvider from './utils/context/AuthProvider.tsx'

export const App = () => (
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
)
