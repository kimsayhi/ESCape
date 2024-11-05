import { ReactNode } from 'react'

export default function BoardStatusScreen({ children }: { children: ReactNode }) {
  return <div className="flex h-dvh items-center justify-center text-brand-white">{children}</div>
}
