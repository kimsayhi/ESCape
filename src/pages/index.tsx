import React from 'react'
import ProductDetailSection from '@/components/productDetail/detail/ProductDetailSection'
import ProductStatisticsSection from '@/components/productDetail/statistic/ProductStatisticsSection'
import ProductReviewSection from '@/components/productDetail/review/ProductReviewSection'

const HomePage: React.FC = () => {
  const productId = 1053 // 예시로 사용할 productId
  const teamId = '8-5' // 고정된 teamId

  return (
    <div>
      <ProductDetailSection productId={productId} teamId={teamId} />
      <ProductStatisticsSection productId={productId} teamId={teamId} />
      <ProductReviewSection productId={productId} teamId={teamId} />
    </div>
  )
}

export default HomePage
