import React from 'react'
import starIcon from '@icons/star_icon.svg'
import commentIcon from '@icons/comment_icon.svg'
import heartIcon from '@icons/heart_icon.svg'
import StatisticsDetail from './StatisticsDetail'

const statisticsDetailContents = [
  {
    title: '별점 평균',
    icon: starIcon,
    value: 4.9,
    description: '같은 카테고리의 제품들보다 0.8점 높아요!',
  },
  {
    title: '찜',
    icon: heartIcon,
    value: 566,
    description: '같은 카테고리의 제품들보다 23개 더 적어요!',
  },
  {
    title: '리뷰',
    icon: commentIcon,
    value: 4123,
    description: '같은 카테고리의 제품들보다 183개 더 많아요!',
  },
]

export default function Statistics() {
  return (
    <div className={'w-full'}>
      <h3 className={'mb-[30px] text-lg font-semibold text-brand-white'}>{'상품 통계'}</h3>
      <div className={'grid grid-cols-3 gap-[10px] xl:gap-5'}>
        {statisticsDetailContents.map((statisticsDetailContent) => (
          <StatisticsDetail
            key={statisticsDetailContent.title}
            title={statisticsDetailContent.title}
            icon={statisticsDetailContent.icon}
            value={statisticsDetailContent.value}
            description={statisticsDetailContent.description}
          />
        ))}
      </div>
    </div>
  )
}
