import React from 'react'
import Image from 'next/image'

interface StatisticsDetailProps {
  title: string
  icon: string
  value: number
  description: string
}

export default function StatisticsDetail({ title, icon, value, description }: StatisticsDetailProps) {
  return (
    <button type={'button'}>
      <div
        className={
          'flex flex-col justify-center items-center gap-[15px] px-[21px] py-5 bg-[#252530] rounded-lg border border-unactive'
        }
      >
        <h4 className={'text-center text-brand-gray-light text-sm font-medium leading-tight'}>{title}</h4>
        <div className={'flex justify-start items-center gap-[5px]'}>
          <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
          <p className={'text-brand-white text-xl font-normal'}>{value}</p>
        </div>
        <p className={'text-center text-brand-gray-light text-xs font-normal mt-2'}>{description}</p>
      </div>
    </button>
  )
}
