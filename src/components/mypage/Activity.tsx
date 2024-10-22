import React from 'react'
import ActivityDetail from './ActivityDetail'
import starIcon from '../../../public/icons/star_icon.svg'
import commentIcon from '../../../public/icons/comment_icon.svg'

/** @todo SSR? */
const activityDetailContents = [
  {
    title: '남긴 별점 평균',
    icon: starIcon,
    value: '4.1',
    isCategory: false,
  },
  {
    title: '남긴 리뷰',
    icon: commentIcon,
    value: '125',
    isCategory: false,
  },
  {
    title: '관심 지역',
    icon: '',
    value: '강남',
    isCategory: true,
  },
]

export default function Activity() {
  return (
    <div className="w-full">
      <h3 className="mb-[30px] text-lg font-semibold text-brand-white">활동 내역</h3>
      <div className="grid grid-cols-3 gap-[10px] xl:gap-5">
        {activityDetailContents.map((activityDetailContent) => (
          <ActivityDetail
            key={activityDetailContent.title}
            title={activityDetailContent.title}
            icon={activityDetailContent.icon}
            value={activityDetailContent.value}
            isCategory={activityDetailContent.isCategory}
          />
        ))}
      </div>
    </div>
  )
}
