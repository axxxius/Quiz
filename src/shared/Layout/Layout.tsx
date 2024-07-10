import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header/Header.tsx'
import { Loader } from '../Loader/Loader.tsx'

export const Layout = () => (
  <Suspense fallback={<Loader />}>
    <Header />
    <Outlet />
  </Suspense>
)
