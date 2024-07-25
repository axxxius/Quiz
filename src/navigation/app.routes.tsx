import { lazy } from 'react'

import { URLS } from './app.urls.ts'

const Auth = lazy(() => import('@screens/Auth/Auth.tsx'))
const ActiveGame = lazy(() => import('@screens/ActiveGame/ActiveGame.tsx'))
const GameSchedule = lazy(() => import('@screens/GameSсhedule/GameSсhedule.tsx'))
const Teams = lazy(() => import('@screens/Teams/Teams.tsx'))
const News = lazy(() => import('@screens/News/News.tsx'))

export const appRoutes: Route[] = [
  {
    path: URLS.NEWS,
    element: <News />
  },
  {
    path: URLS.AUTH.LOGIN,
    element: <Auth />
  },
  {
    path: URLS.AUTH.REGISTER,
    element: <Auth />
  },
  {
    path: URLS.ACTIVEGAME,
    element: <ActiveGame />
  },
  {
    path: URLS.GAMESHEDULE,
    element: <GameSchedule />
  },
  {
    path: URLS.TEAMS,
    element: <Teams />
  }
]
