import { lazy } from 'react'

import { URLS } from './app.urls.ts'

const Main = lazy(() => import('../screens/Main/Main.tsx'))
const Teams = lazy(() => import('@screens/Teams/Teams.tsx'))

export const appRoutes: Route[] = [
  {
    path: URLS.MAIN,
    element: <Main />
  },
  {
    path: URLS.TEAMS,
    element: <Teams />
  }
]
