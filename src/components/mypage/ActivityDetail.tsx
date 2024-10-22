import React from 'react'
import Image from 'next/image'

interface ActivityDetailProps {
  title: string
  icon: string
  value: string
  isCategory: boolean
}

export default function ActivityDetail({ title, icon, value, isCategory }: ActivityDetailProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-[15px] px-[21px] py-5 bg-[#252530] rounded-lg border border-unactive">
      <h4 className="text-center text-brand-gray-light text-sm font-medium leading-tight">{title}</h4>
      {isCategory ? (
        <p className="px-2 py-1 bg-[#757aff]/10 rounded-md justify-center items-center gap-2.5 text-center text-brand-indigo text-xs font-normal">
          {value}
        </p>
      ) : (
        <div className="flex justify-start items-center gap-[5px]">
          <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
          <p className="text-brand-white text-xl font-normal">{value}</p>
        </div>
      )}
    </div>
  )
}
