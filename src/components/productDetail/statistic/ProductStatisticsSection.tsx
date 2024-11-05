import React from 'react'
import starIcon from '@icons/star_icon.svg'
import commentIcon from '@icons/comment_icon.svg'
import heartIcon from '@icons/heart_icon.svg'
import { ProductDetailTypes } from '@/dtos/ProductDto'
import StatisticsDetail from './StatisticsDetail'

interface StatisticsProps {
  productData: ProductDetailTypes
}

const ProductStatisticsSection: React.FC<StatisticsProps> = ({ productData }) => {
  const { rating, favoriteCount, reviewCount, categoryMetric } = productData

  const statisticsDetailContents = [
    {
      title: '별점 평균',
      icon: starIcon,
      value: parseFloat(rating.toFixed(2)),
      difference: parseFloat((rating - categoryMetric.rating).toFixed(2)),
      description: (
        <>
          {'같은 카테고리의 제품들보다 '}
          <span className="text-white">{Math.abs(parseFloat((rating - categoryMetric.rating).toFixed(2)))}점</span>
          <span className="text-brand-gray-light">{rating > categoryMetric.rating ? '높아요!' : '낮아요!'}</span>
        </>
      ),
    },
    {
      title: '찜 수',
      icon: heartIcon,
      value: parseFloat(favoriteCount.toFixed(0)),
      difference: parseFloat((favoriteCount - categoryMetric.favoriteCount).toFixed(0)),
      description: (
        <>
          {'같은 카테고리의 제품들보다 '}
          <span className="text-white">
            {Math.abs(parseFloat((favoriteCount - categoryMetric.favoriteCount).toFixed(0)))}개
          </span>
          <span className="text-brand-gray-light">
            {favoriteCount > categoryMetric.favoriteCount ? '더 많아요!' : '더 적어요!'}
          </span>
        </>
      ),
    },
    {
      title: '리뷰 수',
      icon: commentIcon,
      value: parseFloat(reviewCount.toFixed(0)),
      difference: parseFloat((reviewCount - categoryMetric.reviewCount).toFixed(0)),
      description: (
        <>
          {'같은 카테고리의 제품들보다 '}
          <span className="text-white">
            {Math.abs(parseFloat((reviewCount - categoryMetric.reviewCount).toFixed(0)))}개
          </span>
          <span className="text-brand-gray-light">
            {reviewCount > categoryMetric.reviewCount ? '더 많아요!' : '더 적어요!'}
          </span>
        </>
      ),
    },
  ]

  return (
    <div className="mx-auto mb-10 max-w-[940px]">
      <h3 className="mb-[30px] text-lg font-semibold">상품 통계</h3>
      <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3 xl:gap-5">
        {statisticsDetailContents.map(statisticsDetailContent => (
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

export default ProductStatisticsSection
