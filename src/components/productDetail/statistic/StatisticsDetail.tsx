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
    <div
      className={
        'flex flex-col items-center justify-center gap-[15px] rounded-lg border border-unactive bg-[#252530] px-[21px] py-5'
      }
    >
      <h4 className={'text-center text-sm font-medium leading-tight text-brand-gray-light'}>{title}</h4>
      <div className={'flex items-center justify-start gap-[5px]'}>
        <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
        <p className={'text-xl font-normal text-brand-white'}>{value}</p>
      </div>
      <p className={'mt-2 text-center text-xs font-normal text-brand-gray-light'}>{description}</p>
    </div>
  )
}
