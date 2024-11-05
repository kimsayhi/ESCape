import { ReactNode } from 'react'

interface HeaderSectionProps {
  children: ReactNode
}

export default function HeaderSection({ children }: HeaderSectionProps) {
  return (
    <div className="flex flex-col justify-between border-b-[1px] border-solid border-brand-black-light pb-6 md:flex-row">
      <h1 className="text-[24px] font-bold leading-6 text-brand-white">{children}</h1>
      <button
        type="submit"
        className="absolute bottom-4 h-12 w-full rounded-xl bg-gradation py-[14px] text-[16px] font-semibold leading-[19px] text-brand-white shadow-xl md:relative md:w-[184px]"
      >
        등록
      </button>
    </div>
  )
}
