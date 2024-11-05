import React from 'react'
import Image from 'next/image'

interface StatisticsDetailProps {
  title: string
  icon: string
  value: number
  description?: React.ReactNode
}

export default function StatisticsDetail({ title, icon, value, description }: StatisticsDetailProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-[5px] rounded-lg border border-unactive bg-[#252530] px-[21px] py-5 md:items-center">
      <div className="flex items-center gap-2 md:flex-col md:items-center md:gap-1">
        <h4 className="text-sm font-medium leading-tight text-brand-gray-light">{title}</h4>
        <div className="flex items-center gap-[5px]">
          <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
          <p className="text-xl font-normal text-brand-white">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-left text-xs font-normal text-brand-gray-light md:text-center">{description}</p>
    </div>
  )
}
