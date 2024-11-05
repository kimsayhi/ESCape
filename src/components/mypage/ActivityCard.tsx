import React from 'react'
import Image from 'next/image'
import { CATEGORY_DATA } from '@/libs/constants/category'

const CATEGORY_COLORS = [
  { bg: 'bg-brand-gray-light/10', text: 'text-brand-gray-light' },
  { bg: 'bg-[#c5d17b]/10', text: 'text-[#c5d17b]' },
  { bg: 'bg-[#f65531]/10', text: 'text-[#f65531]' },
  { bg: 'bg-[#a852ff]/10', text: 'text-[#a852ff]' },
  { bg: 'bg-[#49af19]/10', text: 'text-[#49af19]' },
  { bg: 'bg-[#fc5299]/10', text: 'text-[#fc5299]' },
  { bg: 'bg-[#747aff]/10', text: 'text-[#747aff]' },
  { bg: 'bg-[#2f97e3]/10', text: 'text-[#2f97e3]' },
]

interface ActivityCardProps {
  title: string
  icon: string
  value: string | number
  isCategory: boolean
}

export default function ActivityCard({ title, icon, value, isCategory }: ActivityCardProps) {
  const categoryId = CATEGORY_DATA.find(item => item.name === value)?.id ?? 0
  const categoryColorClasses = CATEGORY_COLORS[categoryId]

  return (
    <div className="flex flex-col items-center justify-center gap-[15px] rounded-lg border border-unactive bg-[#252530] px-[21px] py-5">
      <h4 className="text-center text-sm font-medium leading-tight text-brand-gray-light">{title}</h4>
      {isCategory ? (
        <p
          className={`items-center justify-center gap-2.5 rounded-md px-2 py-1 text-center text-xs font-normal ${categoryColorClasses.bg} ${categoryColorClasses.text}`}
        >
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
