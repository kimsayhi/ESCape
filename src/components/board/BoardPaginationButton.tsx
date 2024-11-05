import React, { ReactNode } from 'react'

interface PaginationButtonProps {
  children: ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isActive: boolean
}

export default function BoardPaginationButton({ children, onClick, isActive }: PaginationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[14px] font-medium leading-[17px] ${isActive ? 'text-brand-white' : 'text-brand-gray-dark'}`}
    >
      {children}
    </button>
  )
}
