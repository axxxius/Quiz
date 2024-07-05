import { RouterProvider } from 'react-router-dom'

import { appRouter } from './navigation/app.router.tsx'

export const App = () => <RouterProvider router={appRouter} />
