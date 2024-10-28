import React from 'react'

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  return <div>ModalProvider</div>
}
