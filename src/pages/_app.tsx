import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useEffect } from 'react'
import { AuthProvider } from '@/contexts/AuthProvider'
import Header from '@/components/@shared/layout/Header'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
})

declare global {
  interface Window {
    Kakao: any
  }
}

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header>
          {children}
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        </Header>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao) {
      const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY
      // 이미 초기화되었는지 확인 후, 초기화되지 않은 경우에만 Kakao.init 호출
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey)
      }
    }
  }, [])

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}
