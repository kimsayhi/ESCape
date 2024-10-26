import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthProvider'

import ToasterProvider from '@/contexts/ToasterProvider'
import Layout from '@/components/@shared/layout/Layout'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 데이터 fresh 시간 일단 1분으로 설정
      retry: 1, // 실패 시 재시도 횟수 일단 1회로 축소
    },
  },
})

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <AuthProvider>
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </ToasterProvider>
    </QueryClientProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}
