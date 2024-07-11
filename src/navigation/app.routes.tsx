import { lazy } from 'react'

import { URLS } from './app.urls.ts'

const Main = lazy(() => import('../screens/Main/Main.tsx'))
const ActiveGame = lazy(() => import('../screens/ActiveGame/ActiveGame.tsx'))

export const appRoutes: Route[] = [
  {
    path: URLS.MAIN,
    element: <Main />
  },
  {
    path: URLS.ACTIVEGAME,
    element: <ActiveGame />
  }
]
