import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import Header from './Header'

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter()

  return !pathname.includes('sign') ? <Header>{children}</Header> : children
}
