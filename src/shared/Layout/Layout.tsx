import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Loader } from '../Loader/Loader.tsx'

export const Layout = () => (
  <Suspense fallback={<Loader />}>
    <Outlet />
  </Suspense>
)
