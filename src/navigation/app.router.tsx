import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@shared'

import { appRoutes } from './app.routes.tsx'

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: appRoutes
  }
])
