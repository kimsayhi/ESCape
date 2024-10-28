import React from 'react'
import ActivityCard from './ActivityCard'
import starIcon from '@icons/star_icon.svg'
import commentIcon from '@icons/comment_icon.svg'
import { UserTypes } from '@/dtos/UserDto'

interface ActivityCardListProps {
  data: UserTypes
}

export default function ActivityCardList({ data }: ActivityCardListProps) {
  const { averageRating, reviewCount, mostFavoriteCategory } = data
  const activityCardContents = [
    {
      title: '남긴 별점 평균',
      icon: starIcon,
      value: averageRating,
      isCategory: false,
    },
    {
      title: '남긴 리뷰',
      icon: commentIcon,
      value: reviewCount,
      isCategory: false,
    },
    {
      title: '관심 지역',
      icon: '',
      value: mostFavoriteCategory.name,
      isCategory: true,
    },
  ]

  return (
    <div className="w-full">
      <h3 className="mb-[30px] text-lg font-semibold text-brand-white xl:text-xl">활동 내역</h3>
      <div className="grid grid-cols-3 gap-[10px] xl:gap-5">
        {activityCardContents.map((activityCardContent) => (
          <ActivityCard
            title={activityCardContent.title}
            icon={activityCardContent.icon}
            value={activityCardContent.value}
            isCategory={activityCardContent.isCategory}
          />
        ))}
      </div>
    </div>
  )
}
