import React, { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import closeIcon from '@icons/close_icon.svg'

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onClick: () => void
  modalFrameClassNames?: string
}

export default function Modal({ children, onClick, modalFrameClassNames }: ModalProps) {
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClick}
      aria-label="모달 뒷 배경"
    >
      <section
        role="dialog"
        aria-modal="true"
        className={`${modalFrameClassNames} relative rounded-xl bg-[#1b1b22] px-5 py-10 md:px-10 md:py-[60px] xl:rounded-2xl`}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
        }}
      >
        <button className="absolute right-4 top-4 ml-auto md:right-5 md:top-5 md:w-9 xl:w-10" onClick={onClick}>
          <Image className="md:w-9 xl:w-10" src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
        </button>
        {children}
      </section>
    </div>
  )
}
