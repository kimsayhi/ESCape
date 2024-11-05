import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useEffect } from 'react'
import { AuthProvider } from '@/contexts/AuthProvider'

import ToasterProvider from '@/contexts/ToasterProvider'
import Layout from '@/components/@shared/layout/Layout'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any
  }
}

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <AuthProvider>
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
          {children}
        </AuthProvider>
      </ToasterProvider>
    </QueryClientProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao) {
      const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey as string)
      }
    }
  }, [])

  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}
