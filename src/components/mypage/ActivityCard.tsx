import React from 'react'
import Image from 'next/image'

interface ActivityCardProps {
  title: string
  icon: string
  value: string | number
  isCategory: boolean
}

export default function ActivityCard({ title, icon, value, isCategory }: ActivityCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[15px] rounded-lg border border-unactive bg-[#252530] px-[21px] py-5">
      <h4 className="text-center text-sm font-medium leading-tight text-brand-gray-light">{title}</h4>
      {isCategory ? (
        <p className="items-center justify-center gap-2.5 rounded-md bg-[#757aff]/10 px-2 py-1 text-center text-xs font-normal text-brand-indigo">
          {value}
        </p>
      ) : (
        <div className="flex items-center justify-start gap-[5px]">
          <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
          <p className="text-xl font-normal text-brand-white">{value}</p>
        </div>
      )}
    </div>
  )
}
