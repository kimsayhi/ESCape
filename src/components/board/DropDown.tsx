import useToggle from '@/hooks/useToggle'
import React, { useEffect, useRef, ReactNode, ReactElement, isValidElement, Children, cloneElement } from 'react'

interface Props {
  children: ReactNode
  width: string
  buttonChildren: ReactNode
  childType?: 'menu' | 'other'
}

export default function Dropdown({ buttonChildren, children, width, childType = 'menu' }: Props) {
  const [isVisible, setIsVisible] = useToggle(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isVisible) {
        return
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsVisible()
      }
    }
    if (isVisible) {
      window.addEventListener('click', handleClickOutside)
    } else {
      window.removeEventListener('click', handleClickOutside)
    }
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isVisible, setIsVisible])

  return (
    <div ref={dropdownRef}>
      <button
        className="flex w-full"
        type="button"
        onClick={() => {
          setIsVisible()
        }}
      >
        {buttonChildren}
      </button>
      {isVisible && (
        <div className="relative">
          <button
            type="button"
            className={`absolute right-0 top-1.5 z-40 m-0 flex flex-col items-center justify-center rounded-2xl border border-solid border-brand-black-light bg-brand-black-medium px-1 py-1 ${width}`}
            onClick={() => setIsVisible()}
          >
            {Children.map(children, child => {
              if (isValidElement(child)) {
                return cloneElement(child as ReactElement, {
                  className:
                    childType === 'menu'
                      ? `flex w-full items-center justify-center rounded-xl py-2 text-[14px] font-normal text-brand-white hover:bg-brand-black-dark`
                      : `flex w-full items-center rounded-xl px-4 py-2 text-[14px] font-normal text-brand-white`,
                })
              }
              return child
            })}
          </button>
        </div>
      )}
    </div>
  )
}
