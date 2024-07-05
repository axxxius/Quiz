import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './styles/global.css'

import { App } from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </RecoilRoot>
)
